import React, { useState, useEffect } from "react";
import axios from "axios";
import { host } from "../constant";
import Cookies from "js-cookie";

const BlogAllComment = ({ blogId, onClose }) => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the blog by ID
    const fetchBlogById = async () => {
      const token = Cookies.get('accessToken')
      try {
        const response = await axios.get(`${host}/blogs/${blogId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });
        console.log("fetchBlogById", response.data.data);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    // Fetch comments for the blog
    const fetchBlogComments = async () => {
      try {
        const response = await axios.get(`${host}/comments/${blogId}`, {
          withCredentials: true,
        });
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchBlogById();
    fetchBlogComments();
  }, [blogId]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-2/3">
        <button onClick={onClose} className="text-gray-700 float-right">
          Close
        </button>
        {blog ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
            <p className="mb-4">{blog.content}</p>
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            {comments.length > 0 ? (
              <ul className="overflow-y-scroll h-64">
                {comments.map((comment) => (
                  <li key={comment._id} className="mb-2">
                    <div className="flex items-center">
                      <img
                        src={comment.owner[0].avatar}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-semibold">
                          {comment.owner[0].username}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BlogAllComment;
