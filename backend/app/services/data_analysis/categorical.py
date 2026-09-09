import pandas as pd


def get_categorical_analysis(df: pd.DataFrame):
    result = {}

    cols = df.select_dtypes(
        include=["object", "category"]
    ).columns

    rows = len(df)
    print("Categorical ... ")

    for col in cols:
        vc = df[col].value_counts()

        result[col] = {
            "value_counts": vc.to_dict(),
            "top_category":
                str(vc.index[0])
                if len(vc)
                else None,
            "top_freq_percent":
                round(
                    vc.iloc[0] / rows * 100,
                    2
                )
                if len(vc)
                else 0
        }

    return result