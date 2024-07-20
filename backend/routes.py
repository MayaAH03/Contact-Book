#All routes will be in this file
from app import app, db
from flask import request, jsonify
from models import Friend

#Get all friends route
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all() #using python code instead of sql to interact with database
     #this line just a simple for loop that will take the friends data, convert it to json and return their information
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

#Create a friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json #converts data to json

        #Checking for required fields (form validation)
        required_fields=["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f'Missing required field: {field}'}), 400 #status code is 400
            
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        
        #for the img url we are using an avatar api
        #fetch avatar image based on gender
        #f"" is just a dynamic placeholder, just like how ${} is in javascript
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl"
        elif gender == "non-binary":
            first_name, last_name = name.split()
            img_url = f"https://avatar.iran.liara.run/username?username={first_name}+{last_name}"
        else:
            img_url = None

        new_friend = Friend(name = name, role=role, description=description, gender=gender, img_url=img_url)
        db.session.add(new_friend)
        #this add command is similar to staging in git^
        db.session.commit()

        return jsonify({"msg":"Friend created successfully"}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

#Delete a friend, the last part of the url is so that we can tell the route which id we are deleting, since each friend has its own unique id, and its of type int.
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None: #if that friend doesnt exist
            return jsonify({"error": "Friend not found"}), 404 #returning error 404
        
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": "Friend deleted"})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 #500 status is internal error
    
#Update Friend Profile, you can use either patch or put method to update the friend profile.
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None: #if that friend doesnt exist
            return jsonify({"error": "Friend not found"}), 404
    
        data = request.json

        #if the name has been updated then it is changed, otherwise if the name isnt changed it will stay the same as before. (thats what the second part of that "name", friend.name means)
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()), 200 #200 status code


    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500 