from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import CoreSchema
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls,
        core_schema: CoreSchema,
        handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        json_schema = handler(core_schema)
        json_schema = handler.resolve_ref_schema(json_schema)
        json_schema.update(type="string")
        return json_schema

class Participant(BaseModel):
    id: int
    name: str
    role: str
    speakingTime: float
    sentiment: float

class SentimentTimeline(BaseModel):
    time: int
    value: float
    topic: str

class MeetingSentiment(BaseModel):
    overall: float
    positive: int
    neutral: int
    negative: int
    timeline: List[SentimentTimeline]

class Meeting(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id")
    title: str
    type: str  # "audio" o "text"
    date: str
    duration: str
    participants: List[Participant]
    sentiment: MeetingSentiment
    keywords: List[dict]
    topics: List[dict]
    keyMoments: List[dict]
    transcript: List[dict]
    summary: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}