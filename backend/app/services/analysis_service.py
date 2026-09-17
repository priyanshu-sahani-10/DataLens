import pandas as pd
from fastapi import UploadFile

from app.services.data_analysis.analyzer import analyze_dataset

MAX_UPLOAD_BYTES = 50 * 1024 * 1024  # 50 MB

class AnalysisService:

    @staticmethod
    async def analyze_csv(
        file: UploadFile
    ):
        try:
            contents = await file.read()
            if len(contents) > MAX_UPLOAD_BYTES:
                raise ValueError(
                    "File too large. Maximum allowed size is 50 MB."
                )
            if not contents.strip():
                raise ValueError("Uploaded CSV is empty.")
            import io
            df = pd.read_csv(io.BytesIO(contents))
            if df.empty or len(df.columns) == 0:
                raise ValueError("Uploaded CSV contains no data.")
            print("File Uploaded")
            result = analyze_dataset(df)
            print("Analyzing file")
            return result

        except ValueError:
            raise
        except Exception as e:
            raise ValueError(
                f"Failed to analyze file: {str(e)}"
            )