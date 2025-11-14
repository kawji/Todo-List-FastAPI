from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import NullPool
# โหลดไฟล์ .env
load_dotenv()

# environment
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DBNAME = os.getenv("DBNAME")

DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

engine = create_engine(DATABASE_URL)
Base = declarative_base()

class DatabaseModel(Base):
    __tablename__ = 'Data_todo'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String(50), nullable=False)
    status = Column(Boolean, nullable=False, default=False)

Base.metadata.create_all(bind=engine)
