import React, { useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mt-24">
      <div className="flex justify-around">
        <form  method="post" className="w-96">
          <div className="text-white text-4xl mb-2 text-center">
            <span className="material-icons" style={{ fontSize: "6rem" }}>
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
