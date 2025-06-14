import requests
from pydub import AudioSegment
import tempfile
import os
from typing import List, Dict

class AudioAnalyzer:
    def __init__(self, api_key: str):
        self.api_key = os.getenv(api_key)
        self.api_url = os.getenv(api_url)
    def transcribe_audio(self, audio_path: str, language: str = "en-EN") -> List[Dict]:
        """Transcribes audio using lemonfox.ai with time marks."""
        audio = AudioSegment.from_wav(audio_path)
        chunks = self._split_audio(audio)
        
        transcript = []
        for i, chunk in enumerate(chunks):
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_audio:
                chunk.export(temp_audio.name, format="mp3")
                
                # CALL TO THE API OF LEMONFOX.AI
                text = self._call_lemonfox_api(temp_audio.name, language)
                if text:
                    start_time = i * 5  # 5 seconds per chunk
                    end_time = start_time + 5
                    transcript.append({
                        "time": f"00:{start_time//60:02d}:{end_time%60:02d}",  # Format HH:MM:SS
                        "text": text
                    })
                
                os.unlink(temp_audio.name)  # Eliminate the temporal file
        
        return transcript

    def _call_lemonfox_api(self, audio_path: str, language: str) -> str:
        """Send the audio to lemonfox.ai and return the transcribed text."""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
        }
        
        files = {"file": open(audio_path, "rb")}
        data = {"language": language}  # Adjust according to the parameters of the API
        
        try:
            response = requests.post(self.api_url, headers=headers, files=files, data=data)
            response.raise_for_status()  # Speak error if the API fails
            return response.json().get("text", "")  # Adjust according to Lemonfox's response
        except Exception as e:
            print(f"Error calling Lemonfox.ai: {e}")
            return ""

    def _split_audio(self, audio: AudioSegment, chunk_size: int = 5000) -> List[AudioSegment]:
        """Divide the audio into fragments of 5 seconds."""
        return [audio[i:i + chunk_size] for i in range(0, len(audio), chunk_size)]
