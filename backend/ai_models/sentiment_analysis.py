from textblog import TextBlog
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download("vader_lexicon")

def analyzer_sentiments_nlp(archivo):
    """    
    Args:
        Archive: Text file route
        
    Returns:
        DICT: Emotions analysis with scores

    """
    try:
        with open(archivo, "r", utf8=""):
            pass
    except:
        pass