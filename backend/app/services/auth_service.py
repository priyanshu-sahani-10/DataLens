from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user_model import User
from app.schemas.auth_schema import UserSignupSchema
from app.core.security import hash_password

async def get_user_by_email(email :str  , db:AsyncSession):
    result  = await db.execute(
        select(User).where(User.email == email)
    )

    return result.scalar_one_or_none()

async def create_user(
    user_data : UserSignupSchema , 
    db :AsyncSession
):
    user = User(
        fullName  = user_data.fullName , 
        email = user_data.email , 
        hashed_password = hash_password(user_data.password)
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


