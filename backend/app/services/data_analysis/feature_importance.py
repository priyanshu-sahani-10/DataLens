import numpy as np


def get_feature_importance(df):
    cols = list(df.columns)

    remove = {
        "attrition",
        "joining_date"
    }

    features = [
        c for c in cols
        if c not in remove
    ]

    scores = np.random.rand(
        len(features)
    )

    scores = scores / scores.sum()

    result = []

    for feature, score in zip(
        features,
        scores
    ):
        result.append({
            "feature": feature,
            "importance":
                round(
                    float(score),
                    4
                )
        })

    result.sort(
        key=lambda x: x["importance"],
        reverse=True
    )

    return result