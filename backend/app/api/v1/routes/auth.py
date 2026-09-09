from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.auth_schema import (
    UserSignupSchema,
    UserLoginSchema,
    UserResponseSchema,
    TokenSchema
)

from app.services.auth_service import (
    get_user_by_email,
    create_user
)

from app.core.security import (
    verify_password,
    create_access_token
)

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/auth" , 
    tags=['Authentication']
)

@router.post(
    "/signup" ,
    response_model=UserResponseSchema,
    status_code=status.HTTP_201_CREATED
)
async def signup(
    user_data : UserSignupSchema , 
    db : AsyncSession = Depends(get_db)
):
    existing_user = await get_user_by_email(email= user_data.email  , db = db)
    if existing_user:
        raise HTTPException(
            status_code=400 , 
            detail= "Email already registered"
        )
    user = await create_user(user_data=user_data , db = db)
    return user 

@router.post(
    "/login",
    response_model=TokenSchema , 
)
async def login(
    user_data : UserLoginSchema ,
    db : AsyncSession = Depends(get_db)
):
    user = await get_user_by_email(
        user_data.email,
        db
    )
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    if not verify_password(
        user_data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    access_token = create_access_token(
        data={
            "sub": user.email
        }
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user)
):
    return current_user


@router.post("/logout")
async def logout():
    return {
        "message": "Logout successful"
    }