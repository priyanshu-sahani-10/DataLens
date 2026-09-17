from pydantic import BaseModel , EmailStr , Field

class UserSignupSchema(BaseModel):
    fullName : str = Field(
        min_length=2 , 
        max_length=100
    )
    email : EmailStr
    password : str  = Field(
        min_length= 8  ,
        max_length=128
    )

class UserLoginSchema(BaseModel):
    email : EmailStr
    password : str

class UserResponseSchema(BaseModel):
    id: int
    fullName : str
    email : EmailStr
    is_active : bool
    is_verified : bool

    model_config = {
        "from_attributes" : True
    }

class TokenSchema(BaseModel):
    access_token : str
    token_type : str