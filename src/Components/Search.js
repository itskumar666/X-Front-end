import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Cookies from 'js-cookie'

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch =async () => {
    const res=await axios.get()
    setSearchQuery(res.data)
  };
  const follow=async()=>{
    const res=await axios.put()
  }
  const unFollow=async()=>{
    const res=await axios.put()
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex items-center bg-black rounded-full shadow-md w-full max-w-md">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-full focus:outline-none bg-black border-2 border-gray-900"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearch}
          className="bg-gray-900 text-white p-2 rounded-r-full hover:bg-blue-600 focus:outline-none"
        >
          <FaSearch />
        </button>
      </div>
      <div>
        <h1>{searchQuery}</h1>
        <button onClick={follow}>Follow</button>
        <button onClick={unFollow}>Unfollow</button>
      </div>
    </div>
  );
};

export default SearchComponent;
