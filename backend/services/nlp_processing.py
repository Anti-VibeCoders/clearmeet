from typing import List, Dict
from collections import defaultdict
from textblob import TextBlob
import spacy
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

class NLPProcessor:
    def __init__(self):
        self.nlp = spacy.load("en_core_news_lg")
        self.sia = SentimentIntensityAnalyzer()

    def analyze_transcript(self, transcript: List[Dict]) -> Dict:
        """Analyze the full transcript"""
        full_text = " ".join([entry["text"] for entry in transcript])
        
        # Feeling analysis
        blob = TextBlob(full_text)
        sentiment = {
            "polarity": blob.sentiment.polarity,
            "subjectivity": blob.sentiment.subjectivity
        }
        
        # Emotions detection (basic implementation)
        emotions = self._detect_emotions(full_text)
        
        # Keywords extraction
        keywords = self._extract_keywords(full_text)
        
        # Identification of topics
        topics = self._identify_topics(transcript)
        
        # Key moments
        key_moments = self._find_key_moments(transcript)
        
        return {
            "sentiment": sentiment,
            "emotions": emotions,
            "keywords": keywords,
            "topics": topics,
            "key_moments": key_moments
        }

    def _detect_emotions(self, text: str) -> Dict:
        """Basic emotions detection"""
        emotions = defaultdict(int)
        doc = self.nlp(text)
        
        for token in doc:
            if token.text.lower() in ["happiness", "glad", "cheerful"]:
                emotions["happiness"] += 1
            elif token.text.lower() in ["sadness", "concerned", "discouraged"]:
                emotions["sadness"] += 1
            elif token.text.lower() in ["anger", "annoying", "frustrated"]:
                emotions["anger"] += 1
            elif token.text.lower() in ["surprise", "impressed"]:
                emotions["surprise"] += 1
        
        return dict(emotions)

    def _extract_keywords(self, text: str, top_n: int = 15) -> List[Dict]:
        """Extract important keywords"""
        doc = self.nlp(text)
        keywords = defaultdict(int)
        
        for token in doc:
            if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop:
                keywords[token.text.lower()] += 1
        
        sorted_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
        return [{"text": kw, "value": count} for kw, count in sorted_keywords[:top_n]]

    def _identify_topics(self, transcript: List[Dict]) -> List[Dict]:
        """Identify main issues"""
        # Simplified implementation
        return [
            {"id": 1, "name": "Introduction", "time": transcript[0]["time"], "sentiment": 0.5},
            {"id": 2, "name": "Main discussion", "time": transcript[len(transcript)//2]["time"], "sentiment": 0.7}
        ]

    def _find_key_moments(self, transcript: List[Dict]) -> List[Dict]:
        """Find key moments based on changes in feeling"""
        # Simplified implementation
        return [
            {
                "time": transcript[0]["time"],
                "description": "Beginning of the meeting",
                "sentiment": 0.6,
                "importance": 0.7
            }
        ]
