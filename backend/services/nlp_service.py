import spacy
from textblob import TextBlob
from typing import List, Dict
from collections import defaultdict

class NLPService:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_lg")

    async def analyze_sentiment(self, text: str) -> Dict:
        blob = TextBlob(text)
        doc = self.nlp(text)
        
        # Basic feeling analysis
        sentiment = {
            "polarity": blob.sentiment.polarity,
            "subjectivity": blob.sentiment.subjectivity
        }
        
        # Emotions detection (basic implementation)
        emotions = defaultdict(int)
        for token in doc:
            if token._.emotion:  # Requiere extensión de emociones
                emotions[token._.emotion] += 1
        
        return {
            "sentiment": sentiment,
            "emotions": dict(emotions),
            "keywords": self.extract_keywords(doc)
        }

    def extract_keywords(self, doc, top_n=15):
        # Extraer palabras clave usando RAKE o similar
        pass
