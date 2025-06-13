from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.meeting_service import MeetingService
from app.services.nlp_service import NLPService
from app.models.meeting import Meeting

router = APIRouter()
meeting_service = MeetingService()
nlp_service = NLPService()

@router.post("/meetings/", response_model=Meeting)
async def create_meeting(meeting: Meeting):
    return await meeting_service.create_meeting(meeting)

@router.post("/meetings/analyze/audio")
async def analyze_audio_meeting(file: UploadFile = File(...)):
    # Process audio and generate analysis
    pass

@router.get("/meetings/{meeting_id}", response_model=Meeting)
async def get_meeting(meeting_id: str):
    meeting = await meeting_service.get_meeting(meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting
