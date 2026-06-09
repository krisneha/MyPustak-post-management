from fastapi import APIRouter, HTTPException
from typing import List
from models.post import Post, PostCreate

router = APIRouter(prefix="/posts", tags=["posts"])

posts_db = []
next_id = 1


@router.get("/", response_model=List[Post])
def get_posts():
    return posts_db


@router.post("/", response_model=Post, status_code=201)
def create_post(post: PostCreate):
    global next_id
    new_post = Post(id=next_id, title=post.title, body=post.body)
    posts_db.append(new_post)
    next_id += 1
    return new_post


@router.delete("/{post_id}", status_code=204)
def delete_post(post_id: int):
    global posts_db
    for i, post in enumerate(posts_db):
        if post.id == post_id:
            posts_db.pop(i)
            return
    raise HTTPException(status_code=404, detail="Post not found")
