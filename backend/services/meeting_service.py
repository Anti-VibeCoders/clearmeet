from app.models.meeting import Meeting, PyObjectId
from app.utils.database import get_db
from typing import List, Optional

class MeetingService:
    def __init__(self):
        self.db = get_db().meetings

    async def create_meeting(self, meeting: Meeting) -> Meeting:
        meeting_dict = meeting.dict(exclude={"id"})
        result = await self.db.insert_one(meeting_dict)
        meeting.id = result.inserted_id
        return meeting

    async def get_meeting(self, meeting_id: str) -> Optional[Meeting]:
        meeting = await self.db.find_one({"_id": PyObjectId(meeting_id)})
        return Meeting(**meeting) if meeting else None

    async def analyze_meeting(self, meeting_id: str):
        # Implement full analysis
        pass
