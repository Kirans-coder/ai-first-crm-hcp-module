import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost:5432/hcp_crm"
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "YOUR_GROQ_API_KEY")
GROQ_MODEL = "gemma2-9b-it"
GROQ_FALLBACK_MODEL = "llama-3.3-70b-versatile"
