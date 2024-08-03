import React, { useEffect, useState } from "react";
import "material-icons/iconfont/material-icons.css";
import { host } from "../constant";
import axios from "axios";
import BlogAllComment from "./BlogAllComment";
import Cookies from "js-cookie";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentPopupBlogId, setCommentPopupBlogId] = useState(null); // State for comment popup
  const token = Cookies.get('accessToken')

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get(`${host}/blogs/`);
        setBlogs(response.data.data.blogs);
        const initialLikes = response.data.data.blogs.reduce((acc, blog) => {
          acc[blog._id] = blog.isLiked; // Assuming `isLiked` comes from API
          return acc;
        }, {});
        setLikedBlogs(initialLikes);
      } catch (error) {
        console.log("Error in Fetching blogs ", error);
      }
    };

    fetchAllBlogs();
  }, []);

  const toggleLikeBlog = async (blogId) => {
    try {
      await axios.post(
        `${host}/likes/toggle/v/${blogId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
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
            'Authorization': `Bearer ${token}`,
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

  const handleAddCommentClick = (blogId) => {
    setCommentPopupBlogId(blogId); // Set the blog ID to show in the popup
  };

  const reverseBlogs = [...blogs].reverse();

  return (
    <div className="bg-black">
      <div className="mt-28">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-200">
          Blogs
        </h1>

        <div className="flex flex-row justify-center items-center flex-wrap">
          {reverseBlogs.map((blog) => {
            const isLiked = likedBlogs[blog._id];
            return (
              <div
                key={blog._id}
                className="p-2 bg-white shadow-md rounded-lg overflow-hidden m-3 w-80 h-[26rem] relative"
              >
                <div className="flex items-center border-b-2 border-gray-500 pb-2 mb-2">
  {blog.owner ? (
    <>
      <img
        src={blog.owner.avatar} // Use avatar URL from blog.owner
        alt="user avatar"
        className="w-12 h-12 border rounded-full"
      />
      <h1 className="font-bold text-2xl mx-2">
        {blog.owner.username}
      </h1>{" "}
    </>
  ) : (
    <h1 className="font-bold text-2xl mx-2">
      Anonymous
    </h1>
  )}
</div>

                <div className="p-2 text-justify border-b-2 border-gray-400">
                  {blog.content}
                </div>

                <div className="flex justify-between border-b-2 py-1">
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
                      onClick={() => handleAddCommentClick(blog._id)}
                    >
                      add_comment
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="font-medium text-gray-600">
                    Author: {blog.owner.username} {/* Display username */}
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      value={newComment[blog._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(blog._id, e.target.value)
                      }
                      placeholder="Add a comment..."
                      className="w-full p-2 border rounded-lg mx-2"
                    ></input>
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
        </div>
      </div>
      {/* For Blog all Comments  */}
      {commentPopupBlogId && (
        <BlogAllComment
          blogId={commentPopupBlogId}
          onClose={() => setCommentPopupBlogId(null)}
        />
      )}
    </div>
  );
};

export default Blog;
