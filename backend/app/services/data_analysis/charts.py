import numpy as np
import pandas as pd

def get_histograms(df):
    result = {}

    num_cols = df.select_dtypes(include=np.number).columns
    print("Charts ... ")

    for col in num_cols:
        series = df[col].dropna()
        if series.empty:
            result[col] = []
            continue
        counts, bins = np.histogram(
            series,
            bins=10
        )

        result[col] = [
            {
                "range": f"{round(bins[i],2)}-{round(bins[i+1],2)}",
                "count": int(counts[i])
            }
            for i in range(len(counts))
        ]

    return result

def get_category_bars(df):
    result = {}

    cat_cols = df.select_dtypes(
        include=["object", "category"]
    ).columns

    for col in cat_cols:
        vc = df[col].value_counts().head(20)

        result[col] = [
            {
                "category": str(k),
                "count": int(v)
            }
            for k, v in vc.items()
        ]

    return result

from itertools import combinations


def get_scatter_plots(df):
    result = {}

    num_cols = list(
        df.select_dtypes(include=np.number).columns[:6]
    )

    for x, y in combinations(num_cols, 2):
        if len(result) >= 10:
            break
        key = f"{x}_vs_{y}"

        sampled = df[[x, y]].dropna().head(500)
        result[key] = [
            {
                "x": float(row[x]),
                "y": float(row[y])
            }
            for _, row in sampled.iterrows()
        ]

    return result

def get_heatmap(df):
    numeric = df.select_dtypes(include=np.number)
    if numeric.shape[1] == 0:
        return []
    corr = numeric.corr().fillna(0)

    result = []

    for row in corr.index:
        for col in corr.columns:
            result.append({
                "x": row,
                "y": col,
                "value": float(corr.loc[row, col])
            })

    return result

def get_boxplots(df):
    result = {}

    num_cols = df.select_dtypes(include=np.number).columns

    for col in num_cols:
        series = df[col].dropna()
        if series.empty:
            result[col] = {
                "min": 0.0,
                "q1": 0.0,
                "median": 0.0,
                "q3": 0.0,
                "max": 0.0
            }
            continue
        result[col] = {
            "min": float(series.min()),
            "q1": float(series.quantile(0.25)),
            "median": float(series.median()),
            "q3": float(series.quantile(0.75)),
            "max": float(series.max())
        }

    return result

def get_feature_importance_chart(feature_importance):
    return [
        {
            "feature": item["feature"],
            "importance": item["importance"]
        }
        for item in feature_importance
    ]

def get_chart_data(df, feature_importance):
    return {
        "histograms": get_histograms(df),

        "category_bars": get_category_bars(df),

        "scatter_plots": get_scatter_plots(df),

        "heatmap": get_heatmap(df),

        "outlier_boxplots": get_boxplots(df),

        "feature_importance_chart":
            get_feature_importance_chart(
                feature_importance
            ),
    }