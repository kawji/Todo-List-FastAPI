import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

# โหลดไฟล์ .env
load_dotenv()

# ดึงค่าจาก environment
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# สร้าง connection string สำหรับ PostgreSQL
DATABASE_URL = f"postgresql://postgres:{DB_PASSWORD}@db.apbkobhfnmcqqzqeeqss.supabase.co:5432/postgres"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

# สร้างโมเดลตาราง
class DatabaseModel(Base):
    __tablename__ = 'Data_todo'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String(50), nullable=False)
    status = Column(Boolean, nullable=False, default=False)

# สร้างตาราง (ถ้ายังไม่มี)
Base.metadata.create_all(engine)

