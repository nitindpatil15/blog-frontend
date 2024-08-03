import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";
import Cookies from "js-cookie";
import axios from "axios";
import { host } from "../constant";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = Cookies.get('accessToken')

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleonLogout = async () => {
    try {
      await axios.post(
        `${host}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Logged Out Successfully!!");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isLoggedIn");
      Cookies.remove("Avatar");
      navigate("/");
    } catch (error) {
      console.log(error, "Failed to Log Out!!");
    }
  };

  const avatarUrl = Cookies.get("Avatar"); // Ensure case matches
  const isLoggedIn = Cookies.get("isLoggedIn");

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 bg-black border-b-2 flex justify-between px-4 py-2 items-center shadow-md">
        <div className="text-gray-400 md:ml-12 text-2xl flex items-center p-2">
          <Link to="/" className="md:ml-14  font-bold">
            WriteStory
          </Link>
          <Link to="/" className="ml-10 mt-1 text-lg">
            Home
          </Link>
        </div>
        <div className="flex items-center p-2">
          <Link
            to="/blog/createblog"
            className="material-icons mx-4 text-white"
            style={{ fontSize: "2.5rem" }}
          >
            add_circle
          </Link>
          <div className="relative">
            {!isLoggedIn ? (
              <Link
                to="/login"
                style={{ fontSize: "2rem" }}
                className="material-icons mr-5 font-semibold p-2 text-white rounded-full"
              >
                account_circle
              </Link>
            ) : (
              <>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-12 h-12 mr-5 font-semibold cursor-pointer text-white rounded-full border-2"
                    onClick={toggleDropdown}
                  />
                ) : (
                  <span className="material-icons" style={{ fontSize: "2rem" }}>
                    account_circle
                  </span>
                )}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg">
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleonLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Add a margin top equal to the height of the navbar */}
      <div style={{ marginTop: "64px" }}></div>
    </>
  );
};

export default Navbar;
