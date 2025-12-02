from .groq_client import groq_chat


def summarize_interaction(text: str) -> str:
    system_prompt = (
        "You are a medical sales CRM assistant. "
        "Summarize the interaction focusing on product efficacy, safety, "
        "HCP sentiment, key objections, and next steps."
    )
    return groq_chat(text, system_prompt)
