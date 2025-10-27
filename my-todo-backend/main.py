import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker ,Session
from fastapi import Depends

from manageData import DatabaseModel

app = FastAPI()


# ดึงค่าจาก environment
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# สร้าง connection string สำหรับ PostgreSQL
DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoItem(BaseModel):
    id: int | None = None
    content: str
    status: bool

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# GET
@app.get("/todos", response_model=List[TodoItem])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(DatabaseModel).all()
    return todos

# New
@app.post("/todos", response_model=TodoItem)
def add_todo(todo: TodoItem, db: Session = Depends(get_db) ):
    new_todo = DatabaseModel(content=todo.content, status=todo.status)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


# Update
@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo: TodoItem, db: Session = Depends(get_db) ):
    db_todo = db.query(DatabaseModel).filter(DatabaseModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db_todo.content = todo.content
    db_todo.status = todo.status
    db.commit()
    db.refresh(db_todo)
    return {"status":"success" , "content": "Update successfully" }


# DELETE 
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db) ):
    db_todo = db.query(DatabaseModel).filter(DatabaseModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(db_todo)
    db.commit()
    return {"status":"success" , "content": "Deleted successfully" }