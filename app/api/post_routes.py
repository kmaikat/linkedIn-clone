from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, User
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)


# get all post - for the feed
@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


# get post by id ()
@post_routes.route('/<int:id>')
def post(id):
    posts = Post.query.get(id)
    return posts.to_dict()


# post a new post
@post_routes.route("/", methods=["POST"])
def make_post():
    form = PostForm()

# update a post


# delete a post
@post_routes.route("/<int:postId>", methods=["DELETE"])
def delete_post_by_id(postId):
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']
    delete_post = Post.query.get(postId)
    if delete_post:
        if delete_post.user_id == current_user_id:
            db.session.delete(delete_post)
            db.session.commit()
            return {'message': 'Post deleted'}
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403

    else:
        return {'error': {
            'message': 'Cannot find post you were looking for',
            'statusCode': 404
        }}, 404
