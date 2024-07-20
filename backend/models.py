#gonna be a table in our data base
from app import db

#creating the class of what a friend's objects are
#e.g name, id, job, etc..
class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True) #primary key means its unique 
    name = db.Column(db.String(100), nullable=False) #cannot be null each user must have name, max length is 100
    role = db.Column(db.String(50), nullable=False) 
    description = db.Column(db.Text, nullable=False) 
    gender = db.Column(db.String(10), nullable=False) 
    img_url = db.Column(db.String(200), nullable=True) 

    #ensure this function is defined inside the class, aka indented
    #sending data to client will be sent as json, just easier that way left side is json syntax, the right is the python data from the class.
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl":self.img_url,
        }