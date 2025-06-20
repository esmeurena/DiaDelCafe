from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menu_items():
    menu_item_1 = MenuItem(name="menu_item_1", description="menu_item_description_1", price=11.11, url="url.com")
    menu_item_2 = MenuItem(name="menu_item_2", description="menu_item_description_2", price=22.22, url="url2.com")
    menu_item_3 = MenuItem(name="menu_item_3", description="menu_item_description_3", price=33.33, url="url3.com")
    
    db.session.add(menu_item_1)
    db.session.add(menu_item_2)
    db.session.add(menu_item_3)
    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
