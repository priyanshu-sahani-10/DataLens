"""Rule-based Smart Insights Engine.

Turns the computed EDA statistics into plain-English findings, ordered by
severity (critical > warning > info). Every rule is a simple, explainable
heuristic — no black boxes — so each insight can be defended in a review:

- missing values  -> column may need dropping / imputation
- strong correlation (|r| >= 0.7) -> features may be redundant
- |skew| > 1      -> mean is misleading, prefer the median
- outliers > 5%   -> investigate measurement / data-entry issues
- dominant category (>90%) -> near-constant column, low signal
"""

import pandas as pd

MAX_INSIGHTS = 12


def _pct(part: float, whole: float) -> float:
    if not whole:
        return 0.0
    return round(part / whole * 100, 2)


def get_insights(
    df: pd.DataFrame,
    *,
    overview: dict,
    data_quality: list,
    correlations: dict,
    distribution: dict,
    outliers: dict,
    categorical_analysis: dict,
    numerical_analysis: dict,
) -> list:
    insights: list[dict] = []

    def add(severity: str, category: str, title: str, message: str):
        insights.append(
            {
                "severity": severity,
                "category": category,
                "title": title,
                "message": message,
            }
        )

    n_rows = overview.get("rows", 0) or 0
    n_cols = overview.get("columns", 0) or 0

    # ---- Sample size -----------------------------------------------------
    if 0 < n_rows < 30:
        add(
            "warning",
            "overview",
            f"Small sample — only {n_rows} rows",
            "Summary statistics are unstable at this size. "
            "Treat means, correlations, and outlier counts as indicative only.",
        )

    # ---- Duplicates ------------------------------------------------------
    dup = overview.get("duplicate_rows", 0) or 0
    if dup > 0 and n_rows:
        dup_pct = _pct(dup, n_rows)
        add(
            "critical" if dup_pct >= 5 else "warning",
            "duplicates",
            f"{dup:,} duplicate rows ({dup_pct}% of data)",
            "Duplicates inflate row counts and bias averages. "
            "Deduplicate before modeling or reporting.",
        )

    # ---- Missing values --------------------------------------------------
    sparse_cols = set()
    for item in data_quality:
        col, pct = item["column"], item["percent"]
        if pct >= 40:
            sparse_cols.add(col)
            add(
                "critical",
                "missing",
                f"'{col}' is {pct}% missing",
                f"With {pct}% missing, '{col}' carries little signal. "
                "Consider dropping it or finding the source of the gaps.",
            )
        elif pct >= 20:
            sparse_cols.add(col)
            add(
                "warning",
                "missing",
                f"'{col}' is {pct}% missing",
                f"One in five values is missing in '{col}'. "
                "Impute (median/mode) or model the missingness before analysis.",
            )

    # ---- Strong correlations ---------------------------------------------
    for rel in correlations.get("strong_relationships", [])[:3]:
        r = rel["correlation"]
        direction = "move together" if r > 0 else "move in opposite directions"
        add(
            "info",
            "correlation",
            f"'{rel['feature_1']}' and '{rel['feature_2']}' are strongly linked (r = {r})",
            f"The two features {direction}. For modeling, one of them may be "
            "redundant — check multicollinearity before regression.",
        )

    # ---- Skewed distributions --------------------------------------------
    for col, dist in distribution.items():
        skew = abs(dist.get("skewness", 0) or 0)
        shape = dist.get("shape", "normal")
        if skew > 1:
            side = "right" if dist.get("skewness", 0) > 0 else "left"
            add(
                "warning",
                "distribution",
                f"'{col}' is heavily {side}-skewed (skew = {dist['skewness']:.2f})",
                f"The mean is being pulled away from the typical value. "
                f"Prefer the median for '{col}', or apply a log transform.",
            )
        elif skew > 0.5:
            add(
                "info",
                "distribution",
                f"'{col}' is moderately {shape.replace('_', ' ')}",
                "Mild asymmetry — fine for most analyses, but worth noting "
                "when comparing means across groups.",
            )

    # ---- Outliers ----------------------------------------------------------
    for col, count in outliers.items():
        if not count or not n_rows:
            continue
        ratio = _pct(count, n_rows)
        if ratio > 5:
            add(
                "warning",
                "outliers",
                f"'{col}' has {count:,} outliers ({ratio}% of rows)",
                "Over 5% of values fall outside the IQR fences. Verify whether "
                "these are errors or genuine extreme cases before deciding.",
            )

    # ---- Constant numeric columns ------------------------------------------
    # (skip columns already flagged as mostly-missing to avoid double reporting)
    for col, stats in numerical_analysis.items():
        if stats.get("std", 0) == 0 and col not in sparse_cols:
            add(
                "warning",
                "overview",
                f"'{col}' is constant",
                "Zero variance means this column carries no information. "
                "It can be safely dropped from analysis and models.",
            )

    # ---- Categorical imbalance / cardinality ---------------------------------
    for col, stats in categorical_analysis.items():
        top_pct = stats.get("top_freq_percent", 0) or 0
        n_unique = len(stats.get("value_counts", {}))
        if top_pct >= 90:
            add(
                "warning",
                "categorical",
                f"'{col}' is dominated by one value ({top_pct}%)",
                "A near-constant column adds almost no signal. "
                "Consider dropping it or merging rare categories.",
            )
        elif top_pct >= 70:
            add(
                "info",
                "categorical",
                f"'{col}' is imbalanced ({top_pct}% are '{stats.get('top_category')}')",
                "Minority classes may be under-represented in any model "
                "trained on this column.",
            )
        if n_rows > 20 and n_unique / max(n_rows, 1) > 0.5:
            add(
                "info",
                "categorical",
                f"'{col}' has high cardinality ({n_unique} unique values)",
                "Too many distinct values for direct one-hot encoding. "
                "Consider grouping rare values into an 'Other' bucket.",
            )

    # ---- All-clean positive signal -------------------------------------------
    if not any(i["severity"] in ("critical", "warning") for i in insights):
        add(
            "info",
            "overview",
            "Dataset looks healthy",
            f"No severe quality issues across {n_rows:,} rows and {n_cols} columns. "
            "Safe to proceed with visualization and modeling.",
        )

    severity_rank = {"critical": 0, "warning": 1, "info": 2}
    insights.sort(key=lambda i: severity_rank.get(i["severity"], 3))
    return insights[:MAX_INSIGHTS]
