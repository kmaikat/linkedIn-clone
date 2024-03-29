from .db import db, environment, SCHEMA, add_prefix_for_prod
from .like import likes
from datetime import datetime


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    body = db.Column(db.String(3000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    picture = db.Column(db.String)
    user = db.relationship("User", back_populates="posts")
    liked_users = db.relationship("User", back_populates="user_likes", secondary=likes)
    comments = db.relationship(
        "Comment", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'picture': self.picture,
            'created_at': self.created_at,
            'updated_at': self.created_at
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'picture': self.picture,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            'post_likes': {user.id: user.to_dict() for user in self.liked_users}
        }
