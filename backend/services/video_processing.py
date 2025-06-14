import os
import subprocess
from moviepy.editor import VideoFileClip
from datetime import datetime
from typing import Tuple

class VideoProcessor:
    def __init__(self, upload_folder: str = "uploads"):
        self.upload_folder = upload_folder
        os.makedirs(upload_folder, exist_ok=True)

    async def save_uploaded_video(self, video_file) -> Tuple[str, str]:
        """Save the video up and return your route and unique name"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"meeting_{timestamp}.mp4"
        filepath = os.path.join(self.upload_folder, filename)
        
        with open(filepath, "wb") as buffer:
            buffer.write(await video_file.read())
        
        return filepath, filename

    def extract_audio(self, video_path: str) -> str:
        """Extract audio from the video and return route from the audio file"""
        audio_path = video_path.replace(".mp4", ".mp3")
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path, code="mp3")
        return audio_path
