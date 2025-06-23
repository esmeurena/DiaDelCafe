from app.models import db, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menu_items():
    menu_item_1 = MenuItem(name="Horchata Latte", description="Latte iced drink with a twist of Horchata flavoring, perfect for fans of the Agua fresca Horchata drink.", price=6.50, url="/diadelcafe_coffee/img1.png")
    menu_item_2 = MenuItem(name="Miel y Canela Latte", description="Honey and Cinnamon latte mix that melts in your mouth with the very first taste!", price=5.75, url="/diadelcafe_coffee/img3.png")
    menu_item_3 = MenuItem(name="Mexican Mocha Latte", description="Mexican Mocha Latte with chocolate cacao beans from Oaxaca, straight from the source.", price=5.75, url="/diadelcafe_coffee/img2.png")
    menu_item_4 = MenuItem(name="Caramelo Latte", description="Caramel latte with a latino twist, drizzled with caramel syrup on top. Perfect for Caramel lovers.", price=6.50, url="/diadelcafe_coffee/img4.png")
    menu_item_5 = MenuItem(name="Vanilla latte", description="Vanilla latte made from vanilla bean. The Vanilla we use comes from Mexico, great for the summer time!", price=5.75, url="/diadelcafe_coffee/img5.png")
    menu_item_6 = MenuItem(name="Chai Latte", description="Chai tea but in latte form! (This drink has Caffeine added). Perfect for Chai latte lovers!", price=6.50, url="/diadelcafe_coffee/img11.png")
    menu_item_7 = MenuItem(name="Mazapan Latte", description="Mazapan latte made from the Mexican candy Mazapan which is a peanut butter based candy. Perfect for any fan of peanut butter.", price=5.75, url="/diadelcafe_coffee/img7.png")
    menu_item_8 = MenuItem(name="Neblina Latte", description="Neblina latte is a nut based drink so it includes nuts. Not recommended to anyone with a nut allergy.", price=5.75, url="/diadelcafe_coffee/img8.png")
    menu_item_9 = MenuItem(name="La Muerte Latte", description="Our most unique drink! It's a vanilla latte with activated charcoal to give it that unique look!", price=5.75, url="/diadelcafe_coffee/img12.png")
    menu_item_10 = MenuItem(name="Horchata Matcha Latte", description="This is our newest menu item, its a hybrid Horchata and Matcha mix, perfect for anyone wanting to try new things!", price=5.75, url="/diadelcafe_coffee/img13.png")
    menu_item_11 = MenuItem(name="El Pesto Panini", description="Turkey, Pesto, and sundried tomatoes, and Cheese panini! The most basic panini with pesto!", price=12.95, url="/diadelcafe_coffee/img6.png")
    menu_item_12 = MenuItem(name="La Soya Panini", description="This is a Soyrizo, Egg, and mixed Cheese Panini. Great for anyone wanting a healthy Chorizo panini!", price=9.95, url="/diadelcafe_coffee/img9.png")
    menu_item_13 = MenuItem(name="El Queso Panini", description="A mixed cheese Panini that tastes very cheesy and ready to serve. Perfect for cheese lovers!", price=12.95, url="/diadelcafe_coffee/img10.png")
    menu_item_14 = MenuItem(name="La Tocineta Panini", description="This is a Bacon, Egg, and cheese panini. Anyone wanting a morning breakfast will love this.", price=9.95, url="/diadelcafe_coffee/img14.png")
    menu_item_15 = MenuItem(name="Mexican Hot Chocolate", description="This is our only chocolate based drink that does not have caffeine. Perfect for kids!", price=6.50, url="/diadelcafe_coffee/img15.png")
    
    
    db.session.add(menu_item_1)
    db.session.add(menu_item_2)
    db.session.add(menu_item_3)
    db.session.add(menu_item_4)
    db.session.add(menu_item_5)
    db.session.add(menu_item_6)
    db.session.add(menu_item_7)
    db.session.add(menu_item_8)
    db.session.add(menu_item_9)
    db.session.add(menu_item_10)
    db.session.add(menu_item_11)
    db.session.add(menu_item_12)
    db.session.add(menu_item_13)
    db.session.add(menu_item_14)
    db.session.add(menu_item_15)
    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
