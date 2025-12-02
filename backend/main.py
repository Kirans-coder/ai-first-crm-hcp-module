from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.connection import Base, engine
from .routers import interactions, hcp

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-First CRM HCP Module")

origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interactions.router)
app.include_router(hcp.router)


@app.get("/")
def root():
    return {"message": "AI-first CRM HCP backend is running"}
