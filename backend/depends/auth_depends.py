from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User

async def get_user(email: EmailStr, db: AsyncSession) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

