from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker ,Session
from fastapi import Depends

from manageData import DatabaseModel

app = FastAPI()
engine = create_engine('sqlite:///database.db' , connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โมเดล Todo
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



# ✅ GET - อ่านทั้งหมด
@app.get("/todos", response_model=List[TodoItem])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(DatabaseModel).all()
    return todos

# ✅ POST - เพิ่ม todo
@app.post("/todos", response_model=TodoItem)
def add_todo(todo: TodoItem, db: Session = Depends(get_db) ):
    new_todo = DatabaseModel(content=todo.content, status=todo.status)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


# ✅ PUT - อัปเดต todo
@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo: TodoItem, db: Session = Depends(get_db) ):
    db_todo = db.query(DatabaseModel).filter(DatabaseModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db_todo.content = todo.content
    db_todo.status = todo.status
    db.commit()
    db.refresh(db_todo)
    return db_todo


# ✅ DELETE - ลบ todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db) ):
    db_todo = db.query(DatabaseModel).filter(DatabaseModel.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(db_todo)
    db.commit()
    return {"message": "Deleted successfully"}