import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import os
from typing import List, Dict

class AudioAnalyzer:
    def __init__(self):
        self.recognizer = sr.Recognizer()

    def transcribe_audio(self, audio_path: str, language: str = "es-ES") -> List[Dict]:
        """Transcribes audio to text with time marks"""
        audio = AudioSegment.from_wav(audio_path)
        chunks = self._split_audio(audio)
        
        transcript = []
        for i, chunk in enumerate(chunks):
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as temp_audio:
                chunk.export(temp_audio.name, format="wav")
                
                with sr.AudioFile(temp_audio.name) as source:
                    audio_data = self.recognizer.record(source)
                    try:
                        text = self.recognizer.recognize_google(audio_data, language=language)
                        start_time = i * 5  # 5 Seconds for Chunk
                        end_time = start_time + 5
                        transcript.append({
                            "time": f"00:{start_time//60:02d}:{end_time%60:02d}",
                            "text": text
                        })
                    except sr.UnknownValueError:
                        continue
        
        return transcript

    def _split_audio(self, audio: AudioSegment, chunk_size: int = 5000) -> List[AudioSegment]:
        """Divide the audio into 5 second chunks"""
        return [audio[i:i + chunk_size] for i in range(0, len(audio), chunk_size)]