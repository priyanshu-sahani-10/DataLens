import pandas as pd
import numpy as np


def _safe_float(value: float) -> float:
    value = float(value)
    return 0.0 if np.isnan(value) or np.isinf(value) else value


def get_numerical_analysis(df: pd.DataFrame):
    result = {}

    cols = df.select_dtypes(
        include=np.number
    ).columns

    for col in cols:
        series = df[col].dropna()
        if series.empty:
            result[col] = {
                "min": 0.0,
                "max": 0.0,
                "mean": 0.0,
                "median": 0.0,
                "std": 0.0
            }
            continue
        result[col] = {
            "min": _safe_float(series.min()),
            "max": _safe_float(series.max()),
            "mean": _safe_float(series.mean()),
            "median": _safe_float(series.median()),
            "std": _safe_float(series.std() or 0.0)
        }

    return result