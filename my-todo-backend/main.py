from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# โมเดล Todo
class TodoItem(BaseModel):
    id: int
    text: str
    completed: bool = False

# เก็บข้อมูลชั่วคราวใน memory
todos: List[TodoItem] = []

# อ่านทั้งหมด
@app.get("/todos", response_model=List[TodoItem])
def get_todos():
    return todos

# เพิ่ม todo
@app.post("/todos", response_model=TodoItem)
def add_todo(todo: TodoItem):
    todos.append(todo)
    return todo

# ลบ todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [t for t in todos if t.id != todo_id]
    return {"message": "Deleted"}
