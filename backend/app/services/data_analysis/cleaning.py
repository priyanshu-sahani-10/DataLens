"""One-click data cleaning.

Applies analyst-standard cleaning operations to a dataframe and reports
exactly what changed, so every action is explainable:

- drop_sparse   -> drop columns at least SPARSE_THRESHOLD % missing
                  (same 40% bar the insights engine flags as critical)
- drop_constant  -> drop zero-variance columns (no signal for analysis)
- deduplicate    -> drop exact duplicate rows
- impute         -> fill numeric gaps with the column median
                  (robust to skew, unlike the mean),
                  fill categorical gaps with the mode
"""

import numpy as np
import pandas as pd

SPARSE_THRESHOLD = 40.0

ALLOWED_ACTIONS = ("drop_sparse", "drop_constant", "deduplicate", "impute")


def clean_dataframe(df: pd.DataFrame, actions: list) -> tuple:
    """Return (cleaned_df, report). Never mutates the caller's dataframe."""
    df = df.copy()
    report: list[dict] = []

    for action in actions or []:
        if action == "drop_sparse":
            missing_pct = df.isnull().mean() * 100
            cols = [c for c in df.columns if missing_pct.get(c, 0) >= SPARSE_THRESHOLD]
            df = df.drop(columns=cols)
            report.append(
                {
                    "action": "drop_sparse",
                    "description": (
                        f"Dropped {len(cols)} column(s) with "
                        f">= {SPARSE_THRESHOLD:g}% missing values"
                    ),
                    "affected_columns": cols,
                    "rows_affected": 0,
                }
            )
        elif action == "drop_constant":
            cols = [c for c in df.columns if df[c].nunique(dropna=False) <= 1]
            df = df.drop(columns=cols)
            report.append(
                {
                    "action": "drop_constant",
                    "description": (
                        f"Dropped {len(cols)} constant column(s) "
                        "(zero variance, no analytical signal)"
                    ),
                    "affected_columns": cols,
                    "rows_affected": 0,
                }
            )
        elif action == "deduplicate":
            dupes = int(df.duplicated().sum())
            df = df.drop_duplicates().reset_index(drop=True)
            report.append(
                {
                    "action": "deduplicate",
                    "description": f"Removed {dupes:,} duplicate row(s)",
                    "affected_columns": [],
                    "rows_affected": dupes,
                }
            )
        elif action == "impute":
            filled_cols: list[str] = []
            filled_cells = 0
            num_cols = df.select_dtypes(include=np.number).columns
            for col in num_cols:
                n = int(df[col].isnull().sum())
                if n:
                    df[col] = df[col].fillna(float(df[col].median()))
                    filled_cols.append(f"{col} (median)")
                    filled_cells += n
            cat_cols = df.select_dtypes(include=["object", "category"]).columns
            for col in cat_cols:
                n = int(df[col].isnull().sum())
                if n and not df[col].mode(dropna=True).empty:
                    df[col] = df[col].fillna(df[col].mode(dropna=True).iloc[0])
                    filled_cols.append(f"{col} (mode)")
                    filled_cells += n
            report.append(
                {
                    "action": "impute",
                    "description": (
                        f"Filled {filled_cells:,} missing value(s) "
                        "with column medians (numeric) / modes (categorical)"
                    ),
                    "affected_columns": filled_cols,
                    "rows_affected": filled_cells,
                }
            )

    return df, report
