from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import MenuItem
from flask import request
from app import db
from app.forms import MenuItemForm
from flask_login import current_user

menu_item_routes = Blueprint('menu_items', __name__)

# POST - create a new menu item
@menu_item_routes.route('/create', methods=['POST'])
@login_required
def create_menu_item():

    form = MenuItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # data = request.get_json()
    if form.validate_on_submit():
        menu_item = MenuItem(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            url=form.data['url']
        )

        db.session.add(menu_item)
        db.session.commit()

        return menu_item.to_dict(), 201
    return form.errors, 401


# GET - get all menu items
@menu_item_routes.route('/')
def get_menu_items():
    """
    Query for all menu items and returns them in a list
    """
    all_menu_items = MenuItem.query.all()
    return {'menu_items': [item.to_dict() for item in all_menu_items]}

# GET - get one menu item
@menu_item_routes.route('/<int:id>')
def get_menu_item(menu_item_id):
    """
    Query for a menu item by id and returns that item in a dictionary
    """
    menu_item = MenuItem.query.get(menu_item_id)
    return menu_item.to_dict()

# PUT - update a menu item
@menu_item_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_menu_item(id):

    form = MenuItemForm()

    new_menu_item = MenuItem.query.get(id)
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_menu_item.name=form.data['name']
        new_menu_item.description=form.data['description'],
        new_menu_item.price=form.data['price'],
        new_menu_item.url=form.data['url']

        db.session.commit()
        return new_menu_item.to_dict(), 200
    return form.errors, 400

    # old_menu_item = request.get_json()
    # if 'name' in old_menu_item:
    #     new_menu_item.name = old_menu_item['name']
    # if 'description' in old_menu_item:
    #     new_menu_item.description = old_menu_item['description']
    # if 'price' in old_menu_item:
    #     new_menu_item.price = old_menu_item['price']
    # if 'url' in old_menu_item:
    #     new_menu_item.url = old_menu_item['url']

    # db.session.commit()

    # return {'menu_item': new_menu_item.to_dict()}


# DELETE - delete a menu item
@menu_item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_menu_item(id):

    # if current_user.id != user_id:
    #     return {"errors": {"message": "Unauthorized"}}, 401
    
    menu_item = MenuItem.query.get(id)

    if not menu_item:
        return {"error": "Menu item not found"}, 404

    db.session.delete(menu_item)
    db.session.commit()
    
    return {"message": "Menu item deleted successfully"}, 200
