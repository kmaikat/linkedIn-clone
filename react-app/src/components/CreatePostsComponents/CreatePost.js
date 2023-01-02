import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import "../../stylesheets/CreatePost.css";
import noPP from "../../assets/no-pp.png";
import { createPostThunk } from "../../store/posts";

function CreatePost({ setShowModal }) {
    const [body, setBody] = useState("");
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const updateBody = (e) => {
        setBody(e.target.value);
        if (e.target.style.height.slice(0, -2) <= 216) e.target.style.height = e.target.scrollHeight + "px"
    };

    const submitPost = async (event) => {
        event.preventDefault();
        const submission = {
            "body": body,
            "user": user.id
        }

        const reponseErrors = await dispatch(createPostThunk(submission))
        if (reponseErrors) {
            return;
        } else {
            setShowModal(false)
        }
    }

    return (
        <div id="create-post-modal-container">
            <div id="create-post-heading-exit-container">
                <div id="create-post-heading-exit-content">

                    <div id="create-post-subtitle">
                        Create a post
                    </div>
                    <div id='create-post-exit-button'>
                        <i onClick={() => setShowModal(false)} className="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>
            <div id="create-post-user-info-container">
                <div id="create-post-user-info-icon">
                    <img id='no-pp' src={noPP} />
                </div>
                <div id="create-post-user-info-name">
                    {user.first_name} {user.last_name}
                </div>
            </div>
            <div id="form-container">
                <form id="body-form" onSubmit={submitPost}>
                    <div id="create-post-textarea">
                        <textarea name='body' placeholder='What do you want to talk about?' value={body} onChange={updateBody} />
                    </div>
                </form>
            </div>
            <div id="create-post-footer-container">
                <div id="empty-div">
                </div>
                <div id="post-container">
                    <button id="create-post-form-can-submit" form="body-form" type="submit" disabled={body.length < 1}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
