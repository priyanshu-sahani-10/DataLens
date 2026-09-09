import pandas as pd
import numpy as np

def get_correlations(df: pd.DataFrame):
    numeric = df.select_dtypes(include=np.number)
    print("Correlation ...")

    corr = numeric.corr()
    strong = []
    cols = corr.columns

    for i in range(len(cols)):
        for j in range(i + 1, len(cols)):
            value = corr.iloc[i, j]

            if abs(value) >= 0.7:
                strong.append({
                    "feature_1": cols[i],
                    "feature_2": cols[j],
                    "correlation": round(float(value), 3)
                })

    # Sort the list by absolute correlation value (descending) and grab the top 10
    strong = sorted(strong, key=lambda x: abs(x["correlation"]), reverse=True)[:10]

    return {
        "matrix": corr.fillna(0).to_dict(),
        "strong_relationships": strong
    }