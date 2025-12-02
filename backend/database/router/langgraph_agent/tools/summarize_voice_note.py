from ...utils.summarizer import summarize_interaction


def summarize_voice_note_tool(transcript: str) -> str:
    """Takes text transcript of voice note and returns structured summary."""
    return summarize_interaction(transcript)
