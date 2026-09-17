from typing import Any, Dict, List, Optional

from pydantic import BaseModel



class OverviewSchema(BaseModel):
    rows: int
    columns: int
    missing_values: int
    duplicate_rows: int

class DataQualityItemSchema(BaseModel):
    column: str
    missing: int
    percent: float

class BasicSummaryItemSchema(BaseModel):
    column: str
    type: str
    nulls: int
    unique: int

class NumericalStatsSchema(BaseModel):
    min: float
    max: float
    mean: float
    median: float
    std: float

class CategoricalStatsSchema(BaseModel):
    value_counts: Dict[str, Any]
    top_category: Optional[str] = None
    top_freq_percent: float

class DistributionSchema(BaseModel):
    skewness: float
    shape: str

class StrongCorrelationSchema(BaseModel):
    feature_1: str
    feature_2: str
    correlation: float

class CorrelationSchema(BaseModel):
    matrix: Dict[str, Dict[str, float]]
    strong_relationships: List[StrongCorrelationSchema]

class FeatureImportanceSchema(BaseModel):
    feature: str
    importance: float

class InsightSchema(BaseModel):
    severity: str  # critical | warning | info
    category: str
    title: str
    message: str

class CleaningActionReportSchema(BaseModel):
    action: str
    description: str
    affected_columns: List[str] = []
    rows_affected: int = 0

class DatasetShapeSchema(BaseModel):
    rows: int
    columns: int
    missing_values: int

class DataCleaningResponseSchema(BaseModel):
    cleaning_report: List[
        CleaningActionReportSchema
    ]
    before: DatasetShapeSchema
    after: DatasetShapeSchema
    analysis: "DatasetAnalysisResponseSchema"

class PreviewRowSchema(BaseModel):
    model_config = {
        "extra": "allow"
    }

# CHART 
class HistogramItemSchema(BaseModel):
    range: str
    count: int

class CategoryBarSchema(BaseModel):
    category: str
    count: int

class ScatterPointSchema(BaseModel):
    x: float
    y: float

class HeatmapItemSchema(BaseModel):
    x: str
    y: str
    value: float

class BoxPlotSchema(BaseModel):
    min: float
    q1: float
    median: float
    q3: float
    max: float

class FeatureImportanceChartSchema(BaseModel):
    feature: str
    importance: float

class ChartDataSchema(BaseModel):

    histograms: Dict[
        str,
        List[HistogramItemSchema]
    ]

    category_bars: Dict[
        str,
        List[CategoryBarSchema]
    ]

    scatter_plots: Dict[
        str,
        List[ScatterPointSchema]
    ]

    heatmap: List[
        HeatmapItemSchema
    ]

    outlier_boxplots: Dict[
        str,
        BoxPlotSchema
    ]

    feature_importance_chart: List[
        FeatureImportanceChartSchema
    ]



# =========================================================
# MASTER RESPONSE
# =========================================================
class DatasetAnalysisResponseSchema(BaseModel):

    overview: OverviewSchema

    data_quality: List[
        DataQualityItemSchema
    ]

    basic_summary: List[
        BasicSummaryItemSchema
    ]

    numerical_analysis: Dict[
        str,
        NumericalStatsSchema
    ]

    categorical_analysis: Dict[
        str,
        CategoricalStatsSchema
    ]

    outliers: Dict[
        str,
        int
    ]

    distribution: Dict[
        str,
        DistributionSchema
    ]

    correlations: CorrelationSchema

    feature_importance: List[
        FeatureImportanceSchema
    ]

    insights: List[
        InsightSchema
    ]

    preview: List[
        Dict[str, Any]
    ]

    charts: ChartDataSchema


DataCleaningResponseSchema.model_rebuild()