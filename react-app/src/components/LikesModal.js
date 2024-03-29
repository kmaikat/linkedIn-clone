import React from "react";
import "../stylesheets/LikesModal.css"

const LikesModal = ({ postLikes }) => {
    const likes = Object.values(postLikes)

    return (
        <div className="likes-modal-container" >
            <div className="reaction-header">
                <div className="reaction-title">
                    <div>Reactions</div>
                    <i class="fa-solid fa-x"></i>
                </div>
                <ul className="reaction-type">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="like-consumption-medium" data-supported-dps="24x24">
                            <g>
                                <path d="M12 0a12 12 0 0112 12 12 12 0 01-12 12A12 12 0 010 12 12 12 0 0112 0z" fill="none" />
                                <circle cx="12" cy="12" r="11" fill="#378fe9" />
                                <path d="M11.71 9.54H5.88A1.37 1.37 0 004.5 11 1.43 1.43 0 006 12.34h.25a1.25 1.25 0 00-.1 2.5 1.25 1.25 0 00.52 2.23 1.23 1.23 0 00-.13.88 1.33 1.33 0 001.33 1h3.6a5.54 5.54 0 001.4-.18l2.26-.66h3c1.58-.06 2-7.29 0-7.29h-.86c-.14 0-.23-.3-.62-.72-.58-.62-1.23-1.42-1.69-1.88a11.19 11.19 0 01-2.68-3.46c-.37-.8-.41-1.17-1.18-1.17a1.22 1.22 0 00-1 1.28c0 .42.09.84.16 1.26a12.52 12.52 0 001.55 3.46" fill="#d0e8ff" fill-rule="evenodd" />
                                <path d="M11.71 9.54H5.88a1.43 1.43 0 00-1 .43A1.43 1.43 0 006 12.36h.25A1.23 1.23 0 005 13.61a1.25 1.25 0 001.15 1.25 1.22 1.22 0 00-.47 1.28 1.24 1.24 0 001 .94 1.23 1.23 0 00-.13.88 1.33 1.33 0 001.33 1h3.6a6 6 0 001.4-.18l2.26-.66h3c1.58-.05 2-7.28 0-7.28h-.86c-.14 0-.23-.3-.62-.72-.59-.62-1.24-1.43-1.66-1.88a11.19 11.19 0 01-2.68-3.46c-.37-.81-.41-1.2-1.18-1.17a1.15 1.15 0 00-1 1.28c0 .4.05.81.11 1.21a12.12 12.12 0 001.55 3.44" fill="none" stroke="#004182" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg>
                        <div>
                            {Object.keys(postLikes).length}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="user-reactions-list">
                <ul>
                    {likes.length > 0 && likes.map((user) => {
                        return (
                        <div className="user-reaction-profile" key={user.id}>
                            <div className="user-reaction-profile-picture">
                                <img src={user.profile_picture} alt="Profile Picture"/>
                            </div>
                            <div className="user-reaction-profile-information">
                                <p className="user-reaction-profile-information-name">{user.first_name} {user.last_name}</p>
                                <p className="user-reaction-profile-information-title">{user.title}</p>
                            </div>
                        </div>
                        )
                    }

                    )

                    }
                </ul>
            </div>
        </div>
    )
}

export default LikesModal
