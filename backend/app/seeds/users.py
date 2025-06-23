from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user = User(first_name="demo", last_name="demo@aa.io", email="email1@email.com", birth_day=2, birth_month=12, birth_year=1999, password="password")
    marnie = User(first_name="marnie", last_name="marnie@aa.io", email="email2@email.com", birth_day=3, birth_month=11, birth_year=1997, password="password")
    joe_doe = User(first_name="joe_doe", last_name="joe@aa.io", email="email3@email.com", birth_day=4, birth_month=3, birth_year=1996, password="password")
    
    db.session.add(demo_user)
    db.session.add(marnie)
    db.session.add(joe_doe)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
