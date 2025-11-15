from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Boolean

Base = declarative_base()

class DatabaseModel(Base):
    __tablename__ = 'Data_todo'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String(50), nullable=False)
    status = Column(Boolean, nullable=False, default=False)
