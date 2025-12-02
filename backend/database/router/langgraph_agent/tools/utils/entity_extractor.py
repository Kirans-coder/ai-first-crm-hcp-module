from .groq_client import groq_chat


def extract_entities(text: str) -> dict:
    system_prompt = (
        "Extract key entities from the following medical rep–HCP interaction: "
        "HCP name, product(s), sentiment (Positive/Neutral/Negative), "
        "and key follow-up actions. Respond strictly in JSON."
    )
    raw = groq_chat(text, system_prompt)
    # for simplicity just return raw string; frontend can show it
    return {"raw": raw}
