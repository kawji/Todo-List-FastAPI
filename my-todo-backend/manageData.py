from sqlalchemy import create_engine ,Column ,Integer ,String ,Boolean 
from sqlalchemy.orm import declarative_base ,sessionmaker

engine = create_engine('sqlite:///database.db')
Base = declarative_base()

Session = sessionmaker(bind=engine)

class DatabaseModel(Base):
    __tablename__ = 'Data_todo'
    id = Column(Integer ,primary_key=True ,autoincrement=True)
    content = Column(String(50) ,nullable=False)
    status =  Column(Boolean ,nullable=False ,default=False)


Base.metadata.create_all(engine)


