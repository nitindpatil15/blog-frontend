import React, { useState } from "react";
import { Link } from "react-router-dom";
import "material-icons/iconfont/material-icons.css";

const Blog = ({ posts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <div className="bg-black">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-200">Blogs</h1>
        <div className="flex flex-row justify-center items-center flex-wrap">
          <div className="bg-white shadow-md rounded-lg overflow-hidden m-3 w-80 h-auto relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center py-1">
                <img
                  src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/385600/385632.jpg"
                  alt="user"
                  className="w-12 h-12 border rounded-full"
                />
                <h1 className="font-bold text-2xl mx-2">UserName</h1>
              </div>
              <div
                className="material-icons cursor-pointer"
                onClick={toggleDropdown}
              >
                more_vert
              </div>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 w-28 font-medium bg-white border border-gray-300 divide-gray-100 rounded-md shadow-lg">
                <Link
                  to="/blog/update"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Update
                </Link>
                <Link
                  to="/blog/delete"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Delete Blog
                </Link>
              </div>
            )}
            <img
              src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/385600/385632.jpg"
              alt="blog title"
              className="w-full h-60 object-cover"
            />
            <div className="flex mt-1">
              <div className="material-icons mx-3 cursor-pointer text-red-500">
                favorite
              </div>
              <div className="material-icons cursor-pointer">add_comment</div>
            </div>
            <div className="p-2">
              <h2 className="text-2xl font-semibold mb-2">Title</h2>
              <Link
                to={`/posts/7149957gwg`}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Read more
              </Link>
            </div>
          </div>
          
          {/* Repeat the blog card as needed */}
          
        </div>
      </div>
    </div>
  );
};

export default Blog;
