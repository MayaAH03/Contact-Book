from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#this line just configures the data base my setting the reference point for it. the "sqlite//" link refers to the name of the database we set up
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"

#performance reasons, dont need to use more resources
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#db is data base
db = SQLAlchemy(app)

import routes #dont need the from in the beginning because routes doesnt return anything

with app.app_context(): #this line is just for optimization
    #this creates the table with the template we provided in the models.py file
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)