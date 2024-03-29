import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import noPP from "../assets/no-pp.png";
import "../stylesheets/Comments.css"
import CommentCard from "./CommentCard";
import { createCommentThunk } from "../store/comment";

TimeAgo.addDefaultLocale(en)

const Comments = ({ post }) => {
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user);
    // const post = useSelector(state => state.session.post);
    const dispatch = useDispatch()
    const postContent = useRef(null)

    // div for comment text area
    // div for all comments

    const updateBody = (e) => {
        setBody(e.target.textContent);
    };

    const submitComment = async (event) => {
        event.preventDefault();
        const submission = {
            body
        }

        const errors = await dispatch(createCommentThunk(submission, post.id))

        if (errors) {

        } else {
            postContent.current.textContent = ""
            setBody("")
        }
    }

    const comments = Object.values(post.comments)

    useEffect(() => {
        const errors = {}
        if (body.trim().length < 1 || body.length > 1500) errors.body = true;

        setErrors(errors)
    }, [body])


    return (
        <div id="comment-section-container">
            <div id="comment-input-section-container">
                {/* "THIS IS WHERE THE INPUT IS GOING" */}
                <form id="comment-body-form" onSubmit={submitComment}>
                    <div id="create-comment-user-info-icon">
                        <img id='no-pp' src={user.profile_picture || noPP} />
                    </div>
                    <div id="comment-input-and-submit">
                        <p contentEditable={true} name="body" placeholder="Add a comment..." onInput={updateBody} ref={postContent} />
                        <div>
                            {body && <button onClick={submitComment} disabled={errors.body}>Post</button>}
                            {body.trim().length > 0 && errors.body && <label style={{ color: "#d11124" }}>{body.length}/1500</label>}
                        </div>
                    </div>
                </form>
            </div>
            {comments.length > 0 && < ul id="all-comment-section-container">
                {comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} user={user} />
                )).reverse()}
            </ul>}
        </div >
    )
}

export default Comments
