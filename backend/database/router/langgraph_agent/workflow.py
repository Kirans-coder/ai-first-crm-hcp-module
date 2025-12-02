from typing import TypedDict, Dict, Any
from langgraph.graph import StateGraph, END
from sqlalchemy.orm import Session
from .agent import LangGraphHCPAgent


class AgentState(TypedDict):
    message: str
    payload: Dict[str, Any]
    output: Dict[str, Any]


def run_agent_graph(db: Session, message: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    agent = LangGraphHCPAgent(db)

    def node_run(state: AgentState) -> AgentState:
        out = agent.handle(state["message"], state["payload"])
        state["output"] = out
        return state

    workflow = StateGraph(AgentState)
    workflow.add_node("agent_node", node_run)
    workflow.set_entry_point("agent_node")
    workflow.add_edge("agent_node", END)
    app = workflow.compile()

    final_state = app.invoke({"message": message, "payload": payload, "output": {}})
    return final_state["output"]
