import React, { useState } from "react";
import axios from "axios";
import { host } from "../constant";
import Cookies from "js-cookie";

const UpdateBlog = ({ blog, onClose, onUpdate }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [error, setError] = useState(null);
  const token = Cookies.get("accessToken")

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${host}/blogs/${blog._id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      onUpdate(response.data.data.blogUpdate);
      onClose();
    } catch (error) {
      setError("Error updating blog. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
