from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

#this line just configures the data base my setting the reference point for it. the "sqlite//" link refers to the name of the database we set up
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"

#performance reasons, dont need to use more resources
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#db is data base
db = SQLAlchemy(app)

#describing the path to the frontend and the dist folder(the one that contains the final product). getcwd just means get current working directory.
frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

#this line means that the basic route/url (localhost5000) (the one that doesnt include /api/friends), will take us to the react frontend component as the landing page of that url (localhost5000).
#server static files from the dist folder under the "frontend" directory.
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

#api routes
import routes #dont need the from in the beginning because routes doesnt return anything

with app.app_context(): #this line is just for optimization
    #this creates the table with the template we provided in the models.py file
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)