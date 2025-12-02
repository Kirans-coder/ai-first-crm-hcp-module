from sqlalchemy.orm import Session
from ...database import models, schemas
from ...utils.summarizer import summarize_interaction


def log_interaction_tool(db: Session, payload: schemas.InteractionCreate) -> models.Interaction:
    """Create new interaction and auto-generate AI summary."""
    text_parts = [
        payload.topics_discussed or "",
        payload.materials_shared or "",
        payload.outcomes or "",
        payload.follow_up_actions or ""
    ]
    combined = "\n".join([p for p in text_parts if p])
    ai_summary = summarize_interaction(combined) if combined.strip() else None

    db_obj = models.Interaction(
        **payload.dict(),
        ai_summary=ai_summary
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
