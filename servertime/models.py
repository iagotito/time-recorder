from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

from . connect2db import engine, session
from . util import today, now

Base = declarative_base()


class Activity(Base):
    __tablename__ = 'activity'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    date = Column(String)
    begginning = Column(String)
    end = Column(String)

    def __init__(self, name, date, begginning, description=None, end=None):
        self.name = name
        self.description = description
        self.date = date
        self.begginning = begginning
        self.end = end

    def update(self, new_data):
        for key,value in new_data.items():
            setattr(self, key, value)

    def repr(self):
        return f'ID: {self.id}; Name: {self.name}; Description: {self.description}; Date: {self.date}; Begginning: {self.begginning}; End: {self.end}'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': self.date,
            'begginning': self.begginning,
            'end': self.end
        }

    def save(self):
        session.add(self)
        session.commit()

    @classmethod
    def find_by_id(cls, id):
        return session.query(cls).filter_by(id=id).first()

    @classmethod
    def find_by_date(cls, date):
        return session.query(cls).filter_by(date=date).all()


Base.metadata.create_all(engine)
