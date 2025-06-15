from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from services.video_processing import VideoProcessor
from services.audio_analysis import AudioAnalyzer
from services.nlp_processing import NLPProcessor
from schemas.meeting import MeetingCreate, MeetingResponse
from models.meeting import Meeting 
from db.db import get_db
import os
from datetime import datetime

router = APIRouter()
video_processor = VideoProcessor()
audio_analyzer = AudioAnalyzer(os.getenv("AI_KEY"))
nlp_processor = NLPProcessor()

@router.post("/analyze-meeting", response_model=dict)
async def analyze_meeting_video(
    background_tasks: BackgroundTasks,
    video_file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        video_path, filename = await video_processor.save_uploaded_video(video_file)
        
        background_tasks.add_task(
            full_processing_pipeline,
            video_path,
            filename,
            db
        )
        
        return JSONResponse(
            status_code=202,
            content={"message": "The video is being processed", "filename": filename}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def full_processing_pipeline(video_path: str, filename: str, db: AsyncSession):
    """Complete processing pipeline"""
    try:
        audio_path = video_processor.extract_audio(video_path)
        
        transcript = audio_analyzer.transcribe_audio(audio_path)
        
        analysis = nlp_processor.analyze_transcript(transcript)
        
        meeting_data = MeetingCreate(
            title=f"Analyzed meeting - {filename}",
            type="video",
            date=datetime.now().strftime("%d de %B, %Y"),
            duration="00:45:00",
            participants=[],
            sentiment={
                "overall": analysis["sentiment"]["polarity"],
                "positive": int(analysis["sentiment"]["polarity"] * 100),
                "neutral": 30,
                "negative": 10,
                "timeline": []
            },
            keywords=analysis["keywords"],
            topics=analysis["topics"],
            keyMoments=analysis["key_moments"],
            transcript=transcript,
            summary=""
        )
        
        db_meeting = Meeting(
            title=meeting_data.title,
            type=meeting_data.type,
            date=meeting_data.date,
            duration=meeting_data.duration,
            data=meeting_data.model_dump(exclude={"title", "type", "date", "duration"})
        )
        db.add(db_meeting)
        await db.commit()
        await db.refresh(db_meeting)
        
    except Exception as e:
        print(f"Processing error: {e}")
        await db.rollback()
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
        if os.path.exists(video_path):
            os.remove(video_path)