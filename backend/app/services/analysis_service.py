import pandas as pd
from fastapi import UploadFile

from app.services.data_analysis.analyzer import analyze_dataset

class AnalysisService:

    @staticmethod
    async def analyze_csv(
        file: UploadFile
    ):
        try:
            df = pd.read_csv(file.file)
            print("File Uploaded")
            result = analyze_dataset(df)
            print("Analyzing file")
            return result

        except Exception as e:
            raise ValueError(
                f"Failed to analyze file: {str(e)}"
            )