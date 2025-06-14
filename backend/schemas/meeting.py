from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class Participant(BaseModel):
    id: int
    name: str
    role: str
    speakingTime: float
    sentiment: float

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "María González",
                "role": "CEO",
                "speakingTime": 15.2,
                "sentiment": 0.7
            }
        }

class SentimentTimeline(BaseModel):
    time: int
    value: float
    topic: str

    class Config:
        json_schema_extra = {
            "example": {
                "time": 0,
                "value": 0.6,
                "topic": "Introducción"
            }
        }

class MeetingSentiment(BaseModel):
    overall: float
    positive: int
    neutral: int
    negative: int
    timeline: List[SentimentTimeline]

    class Config:
        json_schema_extra = {
            "example": {
                "overall": 0.65,
                "positive": 65,
                "neutral": 25,
                "negative": 10,
                "timeline": [{"time": 0, "value": 0.6, "topic": "Introducción"}]
            }
        }

class Topic(BaseModel):
    id: int
    name: str
    time: str
    duration: str
    sentiment: float

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Revisión de KPIs",
                "time": "00:03:15",
                "duration": "08:45",
                "sentiment": 0.7
            }
        }

class KeyMoment(BaseModel):
    time: str
    description: str
    sentiment: float
    importance: float

    class Config:
        json_schema_extra = {
            "example": {
                "time": "00:08:45",
                "description": "Decisión sobre campaña digital",
                "sentiment": 0.8,
                "importance": 0.9
            }
        }

class Transcript(BaseModel):
    time: str
    speaker: str
    text: str

    class Config:
        json_schema_extra = {
            "example": {
                "time": "00:00:15",
                "speaker": "María González",
                "text": "Buenos días a todos, gracias por unirse a esta reunión."
            }
        }

class MeetingCreate(BaseModel):
    title: str
    type: str  # "audio" o "text"
    date: str
    duration: str
    participants: List[Participant]
    sentiment: MeetingSentiment
    keywords: List[Dict[str, Any]]
    topics: List[Topic]
    keyMoments: List[KeyMoment]
    transcript: List[Transcript]
    summary: str

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Reunión de planificación estratégica Q3",
                "type": "text",
                "date": "12 de junio, 2025",
                "duration": "45:32",
                "participants": [{"id": 1, "name": "María González", "role": "CEO", "speakingTime": 15.2, "sentiment": 0.7}],
                "sentiment": {"overall": 0.65, "positive": 65, "neutral": 25, "negative": 10, "timeline": [{"time": 0, "value": 0.6, "topic": "Introducción"}]},
                "keywords": [{"text": "estrategia", "value": 25}],
                "topics": [{"id": 1, "name": "Revisión de KPIs", "time": "00:03:15", "duration": "08:45", "sentiment": 0.7}],
                "keyMoments": [{"time": "00:08:45", "description": "Decisión sobre campaña digital", "sentiment": 0.8, "importance": 0.9}],
                "transcript": [{"time": "00:00:15", "speaker": "María González", "text": "Buenos días a todos, gracias por unirse a esta reunión."}],
                "summary": "La reunión se centró en la planificación estratégica para el Q3..."
            }
        }

class MeetingResponse(BaseModel):
    id: int
    title: str
    type: str
    date: str
    duration: str
    data: Dict[str, Any]  # Almacena participants, sentiment, keywords, topics, keyMoments, transcript, summary

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Reunión de planificación estratégica Q3",
                "type": "text",
                "date": "12 de junio, 2025",
                "duration": "45:32",
                "data": {
                    "participants": [{"id": 1, "name": "María González", "role": "CEO", "speakingTime": 15.2, "sentiment": 0.7}],
                    "sentiment": {"overall": 0.65, "positive": 65, "neutral": 25, "negative": 10, "timeline": [{"time": 0, "value": 0.6, "topic": "Introducción"}]},
                    "keywords": [{"text": "estrategia", "value": 25}],
                    "topics": [{"id": 1, "name": "Revisión de KPIs", "time": "00:03:15", "duration": "08:45", "sentiment": 0.7}],
                    "keyMoments": [{"time": "00:08:45", "description": "Decisión sobre campaña digital", "sentiment": 0.8, "importance": 0.9}],
                    "transcript": [{"time": "00:00:15", "speaker": "María González", "text": "Buenos días a todos, gracias por unirse a esta reunión."}],
                    "summary": "La reunión se centró en la planificación estratégica para el Q3..."
                }
            }
        }