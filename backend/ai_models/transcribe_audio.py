# pip install --upgrade openai
from openai import OpenAI

client = OpenAI(
  api_key="YOUR_API_KEY",
  base_url="https://api.lemonfox.ai/v1",
)

audio_file = open("/path/to/audio.mp3", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1",
  file=audio_file,
  language="en"
  # response_model= split_audio
)
