from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.security import decode_access_token
from app.services.auth_service import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)


async def get_current_user(
        token : str = Depends(oauth2_scheme) , 
        db : AsyncSession = Depends(get_db)
) : 
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED , 
            details = "Invalid Token"
        )
    email = payload.get("sub")
    user = await get_user_by_email(email=email , db = db)
     
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user 

