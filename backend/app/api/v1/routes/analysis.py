import io
import json

import pandas as pd
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
    status,
    Depends,
)
from fastapi.responses import StreamingResponse

from app.core.dependencies import get_current_user

from app.services.analysis_service import (
    AnalysisService
)
from app.services.data_analysis.analyzer import analyze_dataset
from app.services.data_analysis.cleaning import (
    ALLOWED_ACTIONS,
    clean_dataframe,
)

from app.schemas.analysis import (
    DatasetAnalysisResponseSchema,
    DataCleaningResponseSchema,
)

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)

MAX_UPLOAD_BYTES = 50 * 1024 * 1024  # 50 MB


@router.post(
    "/upload",
    response_model=DatasetAnalysisResponseSchema,
    status_code=status.HTTP_200_OK
)
async def analyze_dataset_route(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    filename = (file.filename or "").lower()
    if not filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    try:
        result = await (
            AnalysisService
            .analyze_csv(file)
        )

        return result

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )


def _parse_clean_request(file: UploadFile, actions_json: str):
    filename = (file.filename or "").lower()
    if not filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )
    try:
        actions = json.loads(actions_json)
    except (json.JSONDecodeError, TypeError):
        raise HTTPException(
            status_code=400,
            detail="actions_json must be a JSON list of action names"
        )
    if not isinstance(actions, list) or not actions:
        raise HTTPException(
            status_code=400,
            detail=f"Select at least one action from: {', '.join(ALLOWED_ACTIONS)}"
        )
    unknown = [a for a in actions if a not in ALLOWED_ACTIONS]
    if unknown:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown cleaning action(s): {', '.join(unknown)}"
        )
    return actions


def _read_csv_upload(file: UploadFile) -> pd.DataFrame:
    try:
        contents = file.file.read()
    finally:
        file.file.seek(0)
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum allowed size is 50 MB."
        )
    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not parse CSV: {str(e)}"
        )
    if df.empty or len(df.columns) == 0:
        raise HTTPException(
            status_code=400,
            detail="Uploaded CSV contains no data."
        )
    return df


@router.post(
    "/clean",
    response_model=DataCleaningResponseSchema,
    status_code=status.HTTP_200_OK,
)
async def clean_dataset_route(
    file: UploadFile = File(...),
    actions_json: str = Form(default="[]"),
    current_user=Depends(get_current_user),
):
    actions = _parse_clean_request(file, actions_json)
    df = _read_csv_upload(file)

    before = {
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "missing_values": int(df.isnull().sum().sum()),
    }
    cleaned, report = clean_dataframe(df, actions)
    after = {
        "rows": int(len(cleaned)),
        "columns": int(len(cleaned.columns)),
        "missing_values": int(cleaned.isnull().sum().sum()),
    }

    return {
        "cleaning_report": report,
        "before": before,
        "after": after,
        "analysis": analyze_dataset(cleaned),
    }


@router.post(
    "/clean/download",
    status_code=status.HTTP_200_OK,
)
async def download_cleaned_csv_route(
    file: UploadFile = File(...),
    actions_json: str = Form(default="[]"),
    current_user=Depends(get_current_user),
):
    actions = _parse_clean_request(file, actions_json)
    df = _read_csv_upload(file)
    cleaned, _ = clean_dataframe(df, actions)

    raw_name = (file.filename or "dataset.csv").split("/")[-1].split("\\")[-1]
    buffer = io.BytesIO()
    cleaned.to_csv(buffer, index=False)
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=cleaned_{raw_name}"
        },
    )