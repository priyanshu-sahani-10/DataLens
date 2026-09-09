import pandas as pd
import numpy as np


def get_distribution(df: pd.DataFrame):
    result = {}

    cols = df.select_dtypes(
        include=np.number
    ).columns

    for col in cols:
        skew = float(df[col].skew())

        if skew > 0.5:
            shape = "right_skewed"
        elif skew < -0.5:
            shape = "left_skewed"
        else:
            shape = "normal"

        result[col] = {
            "skewness": skew,
            "shape": shape
        }

    return result