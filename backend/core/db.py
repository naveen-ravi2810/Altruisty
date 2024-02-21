from sqlmodel import create_engine, Session
from core.settings import settings

engine = create_engine(settings.db_uri)

def get_session() -> Session: # type: ignore

    session = Session(engine)
    try:
        yield session
    finally:
        session.close()
