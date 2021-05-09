from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String

from . connect2db import engine, session
from . util import today, now

Base = declarative_base()


class Activity(Base):
    __tablename__ = 'activity'
    name = Column(String)
    description = Column(String)
    date = Column(String, primary_key=True)
    begginning = Column(String, primary_key=True)
    end = Column(String)

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.date = today()
        self.begginning = None
        self.end = None

    def begin(self):
        self.begginning = now()

    def finish(self):
        self.end = now()

    def set_name(self, name):
        self.name = name

    def set_description(self, description):
        self.description = description

    def repr(self):
        return f'Name: {self.name}; Description: {self.description}; Date: {self.date}; Begginning: {self.begginning}; End: {self.end}'

    def to_dict(self):
        return {
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
    def find_by_date(cls, date):
        return session.query(cls).filter_by(date=date).all()


Base.metadata.create_all(engine)
