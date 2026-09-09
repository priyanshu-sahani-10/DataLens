import pandas as pd
import numpy as np


def get_outliers(df: pd.DataFrame):
    result = {}
    print("Outliers ..... ")
    cols = df.select_dtypes(
        include=np.number
    ).columns

    for col in cols:
        q1 = df[col].quantile(0.25)

        q3 = df[col].quantile(0.75)

        iqr = q3 - q1

        lower = q1 - 1.5 * iqr

        upper = q3 + 1.5 * iqr

        count = (
            (
                (df[col] < lower)
                |
                (df[col] > upper)
            )
        ).sum()

        result[col] = int(count)

    return result