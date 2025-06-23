from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange
from app.models import User

class MenuItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=3, max=40, message="Item Name must be between 3 and 40 characters")])
    description = StringField('description', validators=[DataRequired(), Length(min=3, max=255, message="Description must be between 3 and 255 characters")])
    price = FloatField('price', validators=[DataRequired(), NumberRange(min=0.01, max=1000,  message="Price must be between 0.01 and 1,000.00")])
    url = StringField('url', validators=[DataRequired(), Length(min=3, max=255, message="Url must be a valid link between 3 and 255 characters")])
