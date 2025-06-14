from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from app.services.video_processing import VideoProcessor
from app.services.audio_analysis import AudioAnalyzer
from app.services.nlp_processing import NLPProcessor
from app.models.meeting import MeetingAnalysis
import os
from datetime import datetime
from mongo import Meet_Collection

router = APIRouter()
video_processor = VideoProcessor()
audio_analyzer = AudioAnalyzer()
nlp_processor = NLPProcessor()

@router.post("/analyze-meeting", response_model=MeetingAnalysis)
async def analyze_meeting_video(
    background_tasks: BackgroundTasks,
    video_file: UploadFile = File(...)
):
    try:
        # 1. Save the video
        video_path, filename = await video_processor.save_uploaded_video(video_file)
        
        # 2. Process in the background
        background_tasks.add_task(
            full_processing_pipeline,
            video_path,
            filename
        )
        
        return JSONResponse(
            status_code=202,
            content={"message": "The video is being processed", "filename": filename}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def full_processing_pipeline(video_path: str, filename: str):
    """Complete processing pipeline"""
    try:
        # 1. Extract video audio
        audio_path = video_processor.extract_audio(video_path)
        
        # 2. Transcribe Audio to Text
        transcript = audio_analyzer.transcribe_audio(audio_path)
        
        # 3. Analyze the text
        analysis = nlp_processor.analyze_transcript(transcript)
        
        # 4. Create Complete Meeting Purpose
        meeting_data = {
            "title": f"Analyzed meeting - {filename}",
            "type": "video",
            "date": datetime.now().strftime("%d de %B, %Y"),
            "duration": "00:45:00",  # Calculate real duration
            "participants": [],  # Implement participants detection
            "sentiment": {
                "overall": analysis["sentiment"]["polarity"],
                "positive": int(analysis["sentiment"]["polarity"] * 100),
                "neutral": 30,  # Example values
                "negative": 10,
                "timeline": self._generate_sentiment_timeline(transcript)
            },
            "keywords": analysis["keywords"],
            "topics": analysis["topics"],
            "key_moments": analysis["key_moments"],
            "transcript": transcript,
            "summary": self._generate_summary(transcript, analysis)
        }
        # Save in MongoDB
        await Meet_Collection.insert_one(meeting_data)
        
        # Here you would save in the database
        # await save_to_database(meeting_data)
        
    except Exception as e:
        print(f"Processing error: {e}")
    finally:
        # Cleaning
        os.remove(audio_path)
        os.remove(video_path)
