import pandas as pd


def get_basic_summary(df: pd.DataFrame):
    result = []

    for col in df.columns:
        result.append({
            "column": col,
            "type": str(df[col].dtype),
            "nulls": int(df[col].isnull().sum()),
            "unique": int(df[col].nunique())
        })

    return result