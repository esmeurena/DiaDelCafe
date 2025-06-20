from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class UpdateUserForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    # password = StringField('password', validators=[DataRequired()])
    phone_number = IntegerField('phone_number', validators=[DataRequired()])
    birth_day = IntegerField('birth_day', validators=[DataRequired()])
    birth_month = IntegerField('birth_month', validators=[DataRequired()])
    birth_year = IntegerField('birth_year', validators=[DataRequired()])
