import React from "react";
import "./PostCard.css";
function PostCard({ username,name,profilePicture, content, media, time }) {
  let date = new Date(time);

  // Get the current date
  let currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference = currentDate - date;

  // Convert milliseconds to hours
  let hoursDifference = Math.floor(timeDifference / (1000 * 60 ));

  return (
    <div className="post-card">
      <div className="profile-image">
        <img src="x.png" alt="dp" />
      </div>
      <div className="post-content">
        <div className="post-header">
        <span>{name}</span>
          <span>@{username}</span>
         
          <span>{hoursDifference} mins</span>
        </div>
        <div className="post-description">{content}</div>
        {media=="not posted on cloud"? null : (
          <div className="post-photo">
            <img width="200px" height="200px" src={media} />

          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;