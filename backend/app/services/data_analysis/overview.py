import pandas as pd


def get_overview(df: pd.DataFrame):
    rows, cols = df.shape

    missing = df.isnull().sum().sum()

    duplicates = df.duplicated().sum()
    print("Overview ... ")

    return {
        "rows": rows,
        "columns": cols,
        "missing_values": int(missing),
        "duplicate_rows": int(duplicates),
    }