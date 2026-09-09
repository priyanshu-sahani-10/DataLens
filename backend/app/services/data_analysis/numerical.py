import pandas as pd
import numpy as np


def get_numerical_analysis(df: pd.DataFrame):
    result = {}

    cols = df.select_dtypes(
        include=np.number
    ).columns

    for col in cols:
        result[col] = {
            "min": float(df[col].min()),
            "max": float(df[col].max()),
            "mean": float(df[col].mean()),
            "median": float(df[col].median()),
            "std": float(df[col].std())
        }

    return result