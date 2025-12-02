from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database.connection import get_db
from ..database import models, schemas
from ..langgraph_agent.workflow import run_agent_graph

router = APIRouter(prefix="/interactions", tags=["interactions"])


@router.post("/", response_model=schemas.InteractionOut)
def create_interaction(interaction: schemas.InteractionCreate, db: Session = Depends(get_db)):
    obj = models.Interaction(**interaction.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.get("/", response_model=List[schemas.InteractionOut])
def list_interactions(db: Session = Depends(get_db)):
    return db.query(models.Interaction).all()


@router.get("/{interaction_id}", response_model=schemas.InteractionOut)
def get_interaction(interaction_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Interaction).get(interaction_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    return obj


@router.put("/{interaction_id}", response_model=schemas.InteractionOut)
def update_interaction(
    interaction_id: int,
    payload: schemas.InteractionUpdate,
    db: Session = Depends(get_db)
):
    obj = db.query(models.Interaction).get(interaction_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(obj, field, value)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.post("/agent/chat")
def agent_chat(request: schemas.AgentChatRequest, db: Session = Depends(get_db)):
    payload = {}

    if request.interaction_id:
        payload["interaction_id"] = request.interaction_id

    if request.draft_interaction:
        payload["draft_interaction"] = request.draft_interaction.dict()

    output = run_agent_graph(db, request.message, payload)
    return output
