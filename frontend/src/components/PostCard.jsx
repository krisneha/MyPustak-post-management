import React from 'react';

const PostCard = ({ post, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <button
        onClick={() => onDelete(post.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default PostCard;
