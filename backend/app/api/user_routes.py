from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from flask import request
from app import db
from app.forms import UpdateUserForm
from flask_login import current_user

user_routes = Blueprint('users', __name__)

# GET - all users
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# GET - one user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# PUT - update current user
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):

    if current_user.id != id:
        return {"errors": {"message": "Unauthorized"}}, 401

    form = UpdateUserForm()
    #update_a_product = Product.query.get(id)
    user = User.query.get(id)

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user.first_name=form.data["first_name"]
        user.last_name=form.data["last_name"]
        user.email=form.data["email"]
        user.birth_day=form.data["birth_day"]
        user.birth_month=form.data["birth_month"]
        user.birth_year=form.data["birth_year"]

        db.session.commit()
        return user.to_dict(), 200

    return form.errors, 400


# DELETE - delete a user
@user_routes.route('/', methods=['DELETE'])
@login_required
def delete_user():

    user = User.query.get(current_user.id)

    if not user:
        return {"error": "User not found"}, 404

    db.session.delete(user)
    db.session.commit()
    
    return {"message": "User deleted successfully"}, 200
