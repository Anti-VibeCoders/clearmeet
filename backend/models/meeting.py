from sqlalchemy import Column, Integer, String, Index
from db.db import Base 
from sqlalchemy.dialects.postgresql import JSONB

class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False)
    date = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    data = Column(JSONB, nullable=False)
    __table_args__ = (Index('idx_meeting_data', data, postgresql_using='gin'),)