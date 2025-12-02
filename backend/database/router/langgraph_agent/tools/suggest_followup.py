from ...utils.groq_client import groq_chat


def suggest_followup_tool(context: str) -> str:
    system_prompt = (
        "You are a senior pharma sales coach. Based on the interaction context, "
        "suggest 3–5 concrete follow-up actions with timelines."
    )
    return groq_chat(context, system_prompt)
