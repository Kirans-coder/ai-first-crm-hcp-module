from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database.connection import get_db
from ..database import models, schemas

router = APIRouter(prefix="/hcp", tags=["hcp"])


@router.post("/", response_model=schemas.HCPOut)
def create_hcp(hcp: schemas.HCPCreate, db: Session = Depends(get_db)):
    obj = models.HCP(**hcp.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.get("/", response_model=List[schemas.HCPOut])
def list_hcps(q: str = "", db: Session = Depends(get_db)):
    query = db.query(models.HCP)
    if q:
        query = query.filter(models.HCP.name.ilike(f"%{q}%"))
    return query.limit(50).all()
