from sqlmodel import Session
from Models.user_model import User
from Models.score_model import Score

def update_test_by_student_id(user: User, session: Session, score: int):
    score = Score(user_id=user.id, score=score)
    session.add(score)
    session.commit()
    return True
