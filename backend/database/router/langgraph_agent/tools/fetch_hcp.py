from sqlalchemy.orm import Session
from ...database import models


def fetch_hcp_tool(db: Session, query: str = ""):
    q = db.query(models.HCP)
    if query:
        q = q.filter(models.HCP.name.ilike(f"%{query}%"))
    return q.limit(20).all()
