from sqlmodel import Session, select
from fastapi import HTTPException
from Models import Score
from utils.tasks import get_tasks


def get_task_of_the_current_user(user_id:int, session:Session):
    try:
        statement = select(Score.score).where(Score.user_id == user_id)
        result = session.exec(statement=statement).one()
        tasks = get_tasks(result)
        return tasks
    except:
        raise HTTPException(status_code=404, detail="Tasks cannot be fetched")


def get_next_task_of_the_current_user(user_id:int, session:Session):
    try:
        statement = select(Score).where(Score.user_id == user_id)
        result = session.exec(statement=statement).one()
        if result.score > 15:
            return ["You have completed all the tasks"]
        result.score += 1
        session.add(result)
        session.commit()
        session.refresh(result)
        print("hi")
        tasks = get_tasks(result.score)
        return tasks
    except:
        raise HTTPException(status_code=404, detail="Tasks cannot be fetched")