from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')




class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=3, max=30, message="First Name must be between 3 and 30 characters")])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=3, max=30, message="Last Name must be between 3 and 30 characters")])
    email = StringField('email', validators=[DataRequired(), Length(min=3, max=255, message="Email must be between 3 and 255 characters"), Email(message="Email is not a valid email address"), user_exists])
    password = StringField('password', validators=[DataRequired()])
    birth_day = IntegerField('birth_day', validators=[DataRequired(), NumberRange(min=1, max=31, message="Birth day but be between 1 and 31")])
    birth_month = IntegerField('birth_month', validators=[DataRequired(), NumberRange(min=1, max=31, message="Birth month but be between 1 and 12")])
    birth_year = IntegerField('birth_year', validators=[DataRequired(), NumberRange(min=1930, max=2020, message="Birth year must be a valid year with 4 digits")])
