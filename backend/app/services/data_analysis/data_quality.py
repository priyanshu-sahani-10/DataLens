import pandas as pd


def get_data_quality(df: pd.DataFrame):
    rows = len(df)

    result = []
    print("Quality .....")
    for col in df.columns:
        missing = int(df[col].isnull().sum())

        result.append({
            "column": col,
            "missing": missing,
            "percent": round(
                (missing / rows) * 100,
                2
            )
        })

    return result