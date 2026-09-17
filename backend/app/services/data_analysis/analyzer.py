from .overview import get_overview
from .data_quality import get_data_quality
from .summary import get_basic_summary
from .numerical import get_numerical_analysis
from .categorical import get_categorical_analysis
from .outliers import get_outliers
from .distribution import get_distribution
from .correlations import get_correlations
from .insights import get_insights
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

    overview = get_overview(df)
    data_quality = get_data_quality(df)
    basic_summary = get_basic_summary(df)
    numerical_analysis = get_numerical_analysis(df)
    categorical_analysis = get_categorical_analysis(df)

    insights = get_insights(
        df,
        overview=overview,
        data_quality=data_quality,
        correlations=correlations,
        distribution=distribution,
        outliers=outliers,
        categorical_analysis=categorical_analysis,
        numerical_analysis=numerical_analysis,
    )

    return {
        "overview":
            overview,

        "data_quality":
            data_quality,

        "basic_summary":
            basic_summary,

        "numerical_analysis":
            numerical_analysis,

        "categorical_analysis":
            categorical_analysis,

        "outliers":
            outliers,

        "distribution":
            distribution,

        "correlations":
            correlations,

        "feature_importance":
            feature_importance,

        "insights":
            insights,

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