import React, { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../constant";

const Signup = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [profilePic, setProfilePic] = useState(null);
  const [previewProfilePic, setPreviewProfilePic] = useState(null);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [credentials, setCredentials] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
    setPreviewProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", credentials.fullName);
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("avatar", profilePic);

    try {
      const response = await axios.post(`${host}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log("Registration Failed");
    }
  };

  return (
    <div className="mt-24 mx-16">
      <div className="flex justify-around">
        <form onSubmit={handleOnSubmit} className="flex flex-col mx-4">
          <div className="h-24">
            <div className="profile-pic flex flex-row-reverse justify-between">
              <label className="form__label" htmlFor="profilePic">
                Profile Picture
              </label>
              <input
                className="text-white mt-6 mx-2"
                type="file"
                name="avatar"
                id="profilePic"
                onChange={handleProfilePicChange}
                required
              />
              <div className="rounded-full border-2 h-20 w-20">
                {previewProfilePic && (
                  <img
                    className="rounded-full pd-2 h-20 w-20"
                    src={previewProfilePic}
                    alt="Avatar"
                    width="80"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-white font-bold mb-2 text-2xl">
              Full Name
            </label>
            <input
              className="p-2 rounded-lg"
              type="text"
              name="fullName"
              id="fullName"
              value={credentials.fullName}
              onChange={onChange}
              placeholder="Enter Full Name"
              required
            />
            <label className="text-white font-bold mb-2 text-2xl">
              Username
            </label>
            <input
              className="p-2 rounded-lg"
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={onChange}
              placeholder="Username"
              required
            />
            <label className="text-white font-bold mb-2 text-2xl">Email</label>
            <input
              className="p-2 rounded-lg"
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter Your Email"
              required
            />
            <label className="text-white font-bold mb-2 text-2xl">
              Password
            </label>
            <input
              className="p-2 rounded-lg"
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
              required
            />

            <button
              className="bg-blue-700 my-3 p-2 rounded hover:text-white hover:bg-indigo-600"
              type="submit"
            >
              Submit
            </button>
            <div className="text-white text-sm flex">
              <div>
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500">
                  Sign Up
                </Link>{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
