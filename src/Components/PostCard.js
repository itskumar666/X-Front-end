import React from "react";
import "./PostCard.css";
import Cookies from "js-cookie";
import axios from "axios";
function PostCard({ username,name,profilePicture, content, media, time ,id}) {
  let date = new Date(time);
  // Get the current date
  let currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference = currentDate - date;

  // Convert milliseconds to hours
  let hoursDifference = Math.floor(timeDifference / (1000 * 60 ));


  const deleteTweet = async () => {  // Make sure to pass the `id` as a parameter
    console.log(id)
    try {
     
      const res = await axios.post('http://localhost:9000/api/user/delete/',{ id: id }, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${Cookies.get('token')}`
        } // Include the id in the `data` property
      });
  
      if (res.status === 204) {
        alert('Tweet deleted successfully');
      } else {
        alert('Error deleting tweet');
      }
    } catch (error) {
      console.error("Error deleting tweet:", error);
      alert('Error deleting tweet');
    }
  };
  



const editTweet=async()=>{
  


  try {
    const formData=new FormData()
     
    const res = await axios.post('http://localhost:9000/api/user/updateTweet',{ id: id }, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `${Cookies.get('token')}`
      } // Include the id in the `data` property
    });

    if (res.status === 204) {
      alert('Tweet deleted successfully');
    } else {
      alert('Error deleting tweet');
    }
  } catch (error) {
    console.error("Error deleting tweet:", error);
    alert('Error deleting tweet');
  }



}

  return (
    <div className="post-card">
      <div className="profile-image ">
        <img className=" w-50 h-50 rounded-full" src={profilePicture} alt="dp" />
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
      {Cookies.get('username')===username?
       <div className="flex flex-col ml-10">
        <button className="mb-5"  onClick={editTweet}>Edit</button>
        <button onClick={deleteTweet}>Delete</button>
       </div>:null}
    </div>
  );
}

export default PostCard;