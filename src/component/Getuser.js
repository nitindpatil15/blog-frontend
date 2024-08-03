import React, { useEffect, useState } from "react";
import "material-icons/iconfont/material-icons.css";
import axios from "axios";
import { host } from "../constant";
import GetUserBlogs from "./GetUserBlogs";
import Cookies from "js-cookie";

const Getuser = (props) => {
  const token = Cookies.get('accessToken')
  const [user, setUser] = useState(null); // Initialize as null

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `${host}/users/profile`,
          {},
          { 
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true }
        );
        console.log(response.data);
        setUser(response.data.data); // Access data directly
      } catch (error) {
        console.log(error, "Error in Fetching user");
      }
    };

    getUser();
  }, [token]); // Add empty dependency array to run only once

  if (!user) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <div className="">
      <div className="text-white flex items-center justify-center my-10 mt-28 py-4 mx-6">
        <div className="flex items-center">
          <div className="mx-6 mt-2 flex flex-col w-32">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-42 md:w-32 h-32 border-2 rounded-full"
            />
          </div>
          <div className="">
            <h1 className="text-white text-2xl md:text-4xl mx-2 font-bold">
              {user.fullName}
            </h1>
            <p className="text-gray-400 my-2 mx-2 font-bold">{user.username}</p>
            <p className="text-white font-bold flex items-center">
              <span className="material-icons mx-2 mt-1">email</span>
              {user.email}
            </p>
          </div>
        </div>
      </div>
      <GetUserBlogs avatar={user.avatar} username={user.username} />
    </div>
  );
};

export default Getuser;
