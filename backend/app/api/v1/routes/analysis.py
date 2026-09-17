from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    status,
    Depends,
)

from app.core.dependencies import get_current_user

from app.services.analysis_service import (
    AnalysisService
)

from app.schemas.analysis import (
    DatasetAnalysisResponseSchema
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