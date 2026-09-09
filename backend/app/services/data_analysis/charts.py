import numpy as np
import pandas as pd

def get_histograms(df):
    result = {}

    num_cols = df.select_dtypes(include=np.number).columns
    print("Charts ... ")

    for col in num_cols:
        counts, bins = np.histogram(
            df[col].dropna(),
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
        vc = df[col].value_counts()

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
        df.select_dtypes(include=np.number).columns
    )

    for x, y in combinations(num_cols, 2):
        key = f"{x}_vs_{y}"

        result[key] = [
            {
                "x": float(row[x]),
                "y": float(row[y])
            }
            for _, row in df[[x, y]]
            .dropna()
            .iterrows()
        ]

    return result

def get_heatmap(df):
    corr = (
        df.select_dtypes(include=np.number)
        .corr()
        .fillna(0)
    )

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
        result[col] = {
            "min": float(df[col].min()),
            "q1": float(df[col].quantile(0.25)),
            "median": float(df[col].median()),
            "q3": float(df[col].quantile(0.75)),
            "max": float(df[col].max())
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