from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route("/email-check/<string:email>")
def email_check(email):
    user = User.query.filter(User.email.ilike(email)).one_or_none()

    if user:
        return jsonify({"error": "An account with this email already exists"}), 400
    else:
        return jsonify({"message": "Good to go!"}), 200


@user_routes.route('/<int:id>/followers')
def user_followers(id):
    user = User.query.get(id)
    # need to turn follower list item into an obj
    # return followers object
    return jsonify({follower.id: follower.to_dict_no_followers() for follower in user.followers}), 200


@user_routes.route('/<int:id>/following', methods=["GET"])
def user_following(id):
    # query where the following id is == to the user id
    user = User.query.get(id)
    return jsonify({follower.id: follower.to_dict_no_followers() for follower in user.following}), 200

#post
@user_routes.route('/<int:id>/following/', methods=["POST"])
def follow(id):
    user = User.query.get(current_user.id) #gets the current user
    followed_user = User.query.get(id) #gets the followed user
    if followed_user:
        user.following.append(followed_user)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "cannot find user"})

@user_routes.route('/<int:id>/following/', methods=["DELETE"])
def unfollow(id):
    user = User.query.get(current_user.id) #gets the current user
    followed_user = User.query.get(id) #gets the followed user
    if followed_user and followed_user in user.following:
        user.following.remove(followed_user)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "cannot find user"})


#delete

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
