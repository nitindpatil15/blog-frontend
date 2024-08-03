import React, { useEffect, useState } from "react";
import { host } from "../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateBlog from "./UpdateBlog";
import BlogAllComment from "./BlogAllComment";
import Cookies from "js-cookie";

const GetUserBlogs = (props) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [newComment, setNewComment] = useState({});
  const [blogToUpdate, setBlogToUpdate] = useState(null); // State for the blog to update
  const [commentPopupBlogId, setCommentPopupBlogId] = useState(null); // State for comment popup
  const token = Cookies.get("accessToken");

  const toggleDropdown = (blogId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const toggleLikeBlog = async (blogId) => {
    try {
      await axios.post(
        `${host}/likes/toggle/v/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setLikedBlogs((prev) => ({
        ...prev,
        [blogId]: !prev[blogId],
      }));
    } catch (error) {
      alert("Login to do Like!!");
    }
  };

  const handleCommentChange = (blogId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [blogId]: value,
    }));
  };

  const handleCommentSubmit = async (blogId) => {
    if (!newComment[blogId]) return;

    try {
      const response = await axios.post(
        `${host}/comments/${blogId}`,
        {
          content: newComment[blogId],
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment((prev) => ({
        ...prev,
        [blogId]: "",
      }));
      console.log(response);
    } catch (error) {
      console.log("Error in adding comment: ", error);
    }
  };

  useEffect(() => {
    const fetchUserBlog = async () => {
      try {
        const response = await axios.get(`${host}/blogs/user/blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const blogsData = response.data.data; // Adjusted to directly set blogs array
        setBlogs(blogsData);
        const initialLikes = blogsData.reduce((acc, blog) => {
          acc[blog._id] = blog.isLiked; // Adjust if `isLiked` is part of the blog object
          return acc;
        }, {});
        setLikedBlogs(initialLikes);
      } catch (error) {
        console.log("Error in Fetching blogs ", error);
      }
    };

    fetchUserBlog();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${host}/blogs/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
      });
      alert("Blog deleted Successfully!!!");
      console.log(response);
      navigate("/user/profile");
    } catch (error) {
      alert("Failed to Delete Blog");
    }
  };

  const handleUpdateClick = (blog) => {
    setBlogToUpdate(blog); // Set the blog to update when "Update" is clicked
    toggleDropdown(blog._id); // Close the dropdown
  };

  const handleAddCommentClick = (blogId) => {
    setCommentPopupBlogId(blogId); // Set the blog ID to show in the popup
  };

  const reverseBlogs = [...blogs].reverse();

  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      {reverseBlogs.map((blog) => {
        const isLiked = likedBlogs[blog._id];
        const blogDropdownOpen = dropdownOpen[blog._id];
        return (
          <div
            key={blog._id}
            className="p-2 bg-white shadow-md rounded-lg overflow-hidden m-3 w-80 h-[25rem] relative"
          >
            <div className="flex items-center border-b-2 border-gray-500 pb-2 mb-2">
              <img
                src={props.avatar || "default-avatar-url"} // Handle undefined `avatar`
                alt="user avatar"
                className="w-12 h-12 border rounded-full"
              />
              <h1 className="font-bold text-2xl mx-2">
                {props.username || "Unknown User"}{" "}
                {/* Handle undefined `username` */}
              </h1>
            </div>
            <div className="p-2 text-justify border-b-2 border-gray-400">
              {blog.content}
            </div>

            <div className="flex justify-between border-b-2 border-gray-400">
              <div className="flex mt-1">
                <div
                  onClick={() => toggleLikeBlog(blog._id)}
                  className={`material-icons mx-3 cursor-pointer ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  favorite
                </div>
                <div
                  className="material-icons cursor-pointer"
                  onClick={() => handleAddCommentClick(blog._id)} // Open Comment Popup
                >
                  add_comment
                </div>
              </div>
              <div
                className="material-icons cursor-pointer"
                onClick={() => toggleDropdown(blog._id)}
              >
                more_vert
              </div>
            </div>

            {blogDropdownOpen && (
              <div className="absolute right-0 w-28 font-medium bg-white border border-gray-300 divide-gray-100 rounded-md shadow-lg">
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleUpdateClick(blog)}
                >
                  Update
                </div>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete Blog
                </div>
              </div>
            )}

            <div className="p-2">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="font-medium text-gray-600">
                Author: {props.username || "Unknown User"}{" "}
                {/* Handle undefined `username` */}
              </p>
              <div className="mt-4 flex items-center justify-center">
                <input
                  value={newComment[blog._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(blog._id, e.target.value)
                  }
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded-lg mx-2"
                />
                <button
                  onClick={() => handleCommentSubmit(blog._id)}
                  className="rounded mt-2 p-2 material-icons"
                >
                  check_circle
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {blogToUpdate && (
        <UpdateBlog
          blog={blogToUpdate}
          onClose={() => setBlogToUpdate(null)}
          onUpdate={(updatedBlog) => {
            setBlogs((prev) =>
              prev.map((blog) =>
                blog._id === updatedBlog._id ? updatedBlog : blog
              )
            );
          }}
        />
      )}
      {commentPopupBlogId && (
        <BlogAllComment
          blogId={commentPopupBlogId}
          onClose={() => setCommentPopupBlogId(null)}
        />
      )}
    </div>
  );
};

export default GetUserBlogs;
