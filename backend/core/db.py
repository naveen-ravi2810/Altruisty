from sqlmodel import create_engine, Session
from core.settings import settings
from redis import Redis

engine = create_engine(settings.db_uri)

r_conn = Redis(host=settings.redis_host, port=settings.redis_port, db=settings.redis_db)

def get_session() -> Session: # type: ignore

    session = Session(engine)
    try:
        yield session
    finally:
        session.close()
