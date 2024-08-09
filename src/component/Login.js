import React, { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../constant";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleonLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        `${host}/users/login`,
        { email, username, password },
        {
          withCredentials: true,
        }
      );

      const { accessToken, refreshToken } = response.data.data;
      const { avatar } = response.data.data.UserDetail;
      Cookies.set("accessToken", accessToken, {
        expires: 1,
        sameSite: "None",
        secure: true,
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: 10,
        sameSite: "None",
        secure: true,
      });
      Cookies.set("isLoggedIn", true);
      Cookies.set("Avatar", avatar);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mt-24 mx-8">
      <div className="flex justify-around">
        <form onSubmit={handleonLogin} method="post" className="w-96">
          <div className="text-white hidden md:block text-4xl mb-2 text-center">
            <span className="material-icons" style={{ fontSize: "6rem" }}>
              account_circle
            </span>
          </div>{" "}
          <div className="text-white md:hidden text-4xl mb-2 text-center">
            <span className="material-icons" style={{ fontSize: "4rem" }}>
              account_circle
            </span>
          </div>{" "}
          <div className="flex flex-col ">
            <label className="text-white  font-bold mb-2 text-2xl">
              Username
            </label>
            <input
              className="p-3 rounded-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              placeholder="Username"
            />
            <label className="text-white  font-bold mb-2 text-2xl">Email</label>
            <input
              className="p-3 rounded-lg"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Your Email"
            />
            <label className="text-white  font-bold mb-2 text-2xl">
              Password
            </label>
            <input
              className="p-3 rounded-lg"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
            />
            <button className="bg-blue-700 my-3 p-2">Submit</button>
            <div className="text-white">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-500">
                Sign Up
              </Link>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
