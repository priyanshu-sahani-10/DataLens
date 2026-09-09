from .overview import get_overview
from .data_quality import get_data_quality
from .summary import get_basic_summary
from .numerical import get_numerical_analysis
from .categorical import get_categorical_analysis
from .outliers import get_outliers
from .distribution import get_distribution
from .correlations import get_correlations
from .feature_importance import (
    get_feature_importance
)

from .charts import (
    get_chart_data
)


def analyze_dataset(df):

    feature_importance = (
        get_feature_importance(df)
    )

    correlations = (
        get_correlations(df)
    )

    outliers = (
        get_outliers(df)
    )

    distribution = (
        get_distribution(df)
    )

    return {
        "overview":
            get_overview(df),

        "data_quality":
            get_data_quality(df),

        "basic_summary":
            get_basic_summary(df),

        "numerical_analysis":
            get_numerical_analysis(df),

        "categorical_analysis":
            get_categorical_analysis(df),

        "outliers":
            outliers,

        "distribution":
            distribution,

        "correlations":
            correlations,

        "feature_importance":
            feature_importance,

        "preview":
            df.head(10)
            .fillna("")
            .to_dict(
                orient="records"
            ),

        "charts":
            get_chart_data(
                df,
                feature_importance
            )
    }