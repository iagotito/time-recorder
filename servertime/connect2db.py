import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

if not os.path.exists('servertime/database/data.db'):
    os.mknod('servertime/database/data.db')
engine = create_engine('sqlite:///servertime/database/data.db?check_same_thread=False', echo = True)

Session = sessionmaker(bind=engine)
session = Session()
