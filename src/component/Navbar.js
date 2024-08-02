import React from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

const Navbar = (props) => {
  return (
    <>
      <div className="mb-24">
        <nav className="fixed top-0 right-0 left-0 bg-slate-900 flex justify-between px-4 py-1 md:px-4 items-center">
          <div className="text-gray-400 ml-12 text-2xl flex items-center">
            <Link to="/" className="ml-14 md:ml-0 font-bold">
              WriteStory
            </Link>
            <Link to="/" className="ml-10 mt-1 text-lg">
              Home
            </Link>
          </div>
          <div className="relative">
            <Link to='blog/createblog' style={{ fontSize: "2rem" }} className="material-icons mx-4 text-white">add_box</Link>
            <Link
              to="/login"
              style={{ fontSize: "2rem" }}
              className="material-icons mr-5 font-semibold p-2 text-white rounded-full"
            >
              account_circle
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
