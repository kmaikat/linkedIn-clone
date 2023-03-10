import { useState } from "react";
import { Modal } from "../context/Modal";
import CreatePost from "./CreatePost";
import "../../stylesheets/CreatePost.css"
import noPP from "../../assets/no-pp.png";
import { useSelector } from "react-redux";

function CreatePostModal() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);

    return (
        <>
            <div id="create-post-container">
                <div id="create-post-content">

                    <div id="create-post-user-info-icon">
                        <img id='no-pp' src={user.profile_picture || noPP} />
                    </div>
                    <button id="create-post-button" onClick={() => setShowModal(true)}>
                        Start a post
                    </button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CreatePost setShowModal={setShowModal} />
                        </Modal>
                    )}
                </div>
            </div>
            <div id="post-separator">

            </div>

        </>
    )
}

export default CreatePostModal
