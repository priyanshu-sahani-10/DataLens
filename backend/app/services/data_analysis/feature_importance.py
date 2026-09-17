import numpy as np
import pandas as pd


def get_feature_importance(df: pd.DataFrame):
    """Deterministic, data-driven importance score.

    Numeric columns: normalized variance boosted by mean absolute
    correlation with other numerics.
    Categorical columns: normalized cardinality (unique ratio).
    Scores are normalized to sum to 1.
    """
    scores: dict[str, float] = {}

    numeric_cols = list(df.select_dtypes(include=np.number).columns)
    if numeric_cols:
        variances = {}
        for col in numeric_cols:
            var = float(df[col].var(skipna=True))
            variances[col] = 0.0 if np.isnan(var) else var
        max_var = max(variances.values()) or 1.0

        corr = df[numeric_cols].corr(numeric_only=True).abs().fillna(0.0)
        for col in numeric_cols:
            others = corr.loc[col].drop(col, errors="ignore")
            mean_corr = float(others.mean()) if len(others) else 0.0
            scores[col] = (variances[col] / max_var) * (1.0 + mean_corr)

    cat_cols = list(df.select_dtypes(include=["object", "category"]).columns)
    n_rows = len(df) or 1
    for col in cat_cols:
        unique_ratio = float(df[col].nunique(dropna=True)) / n_rows
        # Rare high-cardinality IDs are less useful; down-weight extremes.
        scores[col] = min(unique_ratio, 1.0 - unique_ratio + 0.01)

    total = sum(scores.values())
    if total <= 0:
        # Fallback: uniform scores so schema stays valid.
        features = list(df.columns)
        if not features:
            return []
        uniform = round(1.0 / len(features), 4)
        return sorted(
            [{"feature": f, "importance": uniform} for f in features],
            key=lambda x: x["importance"],
            reverse=True,
        )

    result = [
        {"feature": feature, "importance": round(float(score / total), 4)}
        for feature, score in scores.items()
    ]
    result.sort(key=lambda x: x["importance"], reverse=True)
    return result