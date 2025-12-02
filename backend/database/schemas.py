from datetime import date, time
from pydantic import BaseModel
from typing import Optional, List


class InteractionBase(BaseModel):
    hcp_id: int
    interaction_type: str
    date: date
    time: time
    attendees: Optional[str] = None
    topics_discussed: Optional[str] = None
    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    ai_summary: Optional[str] = None


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(BaseModel):
    attendees: Optional[str] = None
    topics_discussed: Optional[str] = None
    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None
    sentiment: Optional[str] = None
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None
    ai_summary: Optional[str] = None


class InteractionOut(InteractionBase):
    id: int

    class Config:
        orm_mode = True


class HCPBase(BaseModel):
    name: str
    specialty: Optional[str] = None
    location: Optional[str] = None


class HCPCreate(HCPBase):
    pass


class HCPOut(HCPBase):
    id: int

    class Config:
        orm_mode = True


class AgentChatRequest(BaseModel):
    message: str
    interaction_id: Optional[int] = None
    draft_interaction: Optional[InteractionBase] = None
