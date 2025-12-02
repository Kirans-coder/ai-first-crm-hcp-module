from sqlalchemy.orm import Session
from ...database import models, schemas
from ...utils.summarizer import summarize_interaction


def edit_interaction_tool(
    db: Session,
    interaction_id: int,
    payload: schemas.InteractionUpdate
) -> models.Interaction:
    interaction = db.query(models.Interaction).get(interaction_id)
    if not interaction:
        raise ValueError("Interaction not found")

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(interaction, field, value)

    combined = "\n".join([
        interaction.topics_discussed or "",
        interaction.materials_shared or "",
        interaction.outcomes or "",
        interaction.follow_up_actions or "",
    ])
    if combined.strip():
        interaction.ai_summary = summarize_interaction(combined)

    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return interaction
