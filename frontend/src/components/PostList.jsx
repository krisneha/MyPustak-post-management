import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, onDelete, loading, error }) => {
  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8 text-gray-500">No posts yet. Create your first post!</div>;
  }

  return (
    <div className="mt-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PostList;
