import Sidebar from "./Sidebar"
import{useState,useEffect} from "react"
import PostCard from "./PostCard";
import axios from "axios";
import Cookies from "js-cookie";
import  './Profile.css'
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [post, setPost] = useState([]); 
  const [toggle,setToggle]=useState(false)
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(Cookies.get("token"));
        const response = await axios.get("http://localhost:9000/api/user/myProfile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get("token")}`, // Add Bearer before token
          },
        });
        let result=response.data[0];
        console.log("result",result);
        
        setPost(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const togglehandle=(e)=>{
     setToggle(!toggle)
     console.log(toggle)
  }
  const handleChange = (event) => {
    const { name: fieldName, value } = event.target;
    if (fieldName === 'name') setName(value);
   
    if (fieldName === 'bio') setBio(value);
    if (fieldName === 'location') setLocation(value);
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const bodyData = { name:name, bio:bio, location:location }
     console.log(Cookies.get('token'),"yaha tk nhi pahuch ppa rha hai")
      const response = await axios.put("http://localhost:9000/api/user/profileUpdate", bodyData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${Cookies.get("token")}`, // Add Bearer before token
        },
      });

      const data = await response.message;
     console.log(data)
  

  } catch (error) {
      alert("An error occured");
      console.error('Error:', error);
  }
};

// html yaha se hai
   return (
    <div className="">

{toggle && (
                <div className="form-div w-1/2 h-5/6 flex flex-col justify-center items-center bg-black overflow-y-auto">
                    <button className="cut-btn1" onClick={togglehandle}>x</button>
                    <img className="absolute w-10 h-10 left-1/2 top-2" src="x.png" alt="logo" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-8 mt-12">
                        <h1 className="text-4xl text-white">Update Profile</h1>
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        <input
                            className="p-2 rounded-md mt-14"
                            type="text"
                            name="bio"
                            value={bio}
                            onChange={handleChange}
                            placeholder="Bio"
                        />
                        <input
                            className="p-2 rounded-md mt-4"
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                        
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}

     {!toggle && (<div className="relative bg-black h-screen text-white">
       {/* Top image */}
       <div className="h-60">
         <img
           src="ytb.png"
           alt="Top Image"
           className="w-full h-full object-cover"
         />
       </div>
 
       {/* Bottom left image */}
       <div className="absolute top-40 ml-4 mb-10">
         <img
           src="myimg.png"
           alt="Bottom Left Image"
           className="w-40 h-40 rounded-half"
         />
       </div>
       <button onClick={togglehandle} className="absolute top-64 right-0 mr-9 ">Edit profile</button>
       <div className="absolute top-80 left-6 w-full h-20">
         <h1 className=" absolute top-6 text-2xl">{post.name}</h1>
         <h3 className=" absolute top-14">@{post.username}</h3>
       </div>

       <div className="absolute bottom-96 left-6 mr-9 ">
           <p>
           {post.bio}
           </p>
       </div>
       <div className="absolute bottom-80 left-6 mr-9">
         <span >{post.location}</span>
         <span className="p-10">{post.website}</span>
       </div>
       <div className="absolute bottom-72 left-6 mr-9 ">
       <span >{post.followers && post.followers.length} Followers</span>
          <span className="p-10">{post.following && post.following.length} Following</span>
         
       </div>
      
       <div className="absolute bottom-64 left-1/2 mr-9  ">
         <h1 className="text-2xl">Posts</h1>
       </div>
    <div className="absolute bottom-60 border-b w-full border-gray-700"></div>
    
    
     </div>)}
     { !toggle && post.tweets && post.tweets.length > 0 ?(

            post.tweets.map((po) => (
              
              <PostCard  username={po.username} media={po.media} content={po.content} time={po.createdAt} profilePic={po.profilePicture} name={po.name} />
              
            ))
          ) : (
            <p>No posts available</p>
          )}
    </div>
    
   );
 };