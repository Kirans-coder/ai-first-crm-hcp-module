from typing import Dict, Any
from sqlalchemy.orm import Session
from .tools.log_interaction import log_interaction_tool
from .tools.edit_interaction import edit_interaction_tool
from .tools.fetch_hcp import fetch_hcp_tool
from .tools.summarize_voice_note import summarize_voice_note_tool
from .tools.suggest_followup import suggest_followup_tool
from ..database import schemas
from ..utils.groq_client import groq_chat


class LangGraphHCPAgent:
    """
    Minimal 'agent' that chooses tools via LLM intent classification
    and executes them. Wrapped by LangGraph workflow.
    """

    def __init__(self, db: Session):
        self.db = db
        self.tools = {
            "log_interaction": self._log_interaction,
            "edit_interaction": self._edit_interaction,
            "fetch_hcp": self._fetch_hcp,
            "summarize_voice_note": self._summarize_voice_note,
            "suggest_followup": self._suggest_followup,
        }

    def route(self, message: str) -> str:
        system_prompt = (
            "You are a tool router for an HCP CRM agent. "
            "Choose exactly one tool from: log_interaction, edit_interaction, "
            "fetch_hcp, summarize_voice_note, suggest_followup. "
            "Respond with only the tool name."
        )
        return groq_chat(message, system_prompt).strip()

    # ---- tool wrappers ----
    def _log_interaction(self, payload: Dict[str, Any]):
        data = schemas.InteractionCreate(**payload)
        return log_interaction_tool(self.db, data)

    def _edit_interaction(self, payload: Dict[str, Any]):
        interaction_id = int(payload.pop("interaction_id"))
        data = schemas.InteractionUpdate(**payload)
        return edit_interaction_tool(self.db, interaction_id, data)

    def _fetch_hcp(self, payload: Dict[str, Any]):
        query = payload.get("query", "")
        return fetch_hcp_tool(self.db, query)

    def _summarize_voice_note(self, payload: Dict[str, Any]):
        transcript = payload.get("transcript", "")
        return summarize_voice_note_tool(transcript)

    def _suggest_followup(self, payload: Dict[str, Any]):
        context = payload.get("context", "")
        return suggest_followup_tool(context)

    # ---- public entrypoint ----
    def handle(self, message: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        tool_name = self.route(message)
        tool = self.tools.get(tool_name)
        if not tool:
            return {"tool": "none", "result": "I could not decide on a tool."}
        result = tool(payload)
        return {"tool": tool_name, "result": result}

