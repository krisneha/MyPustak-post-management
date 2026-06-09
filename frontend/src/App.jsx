import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { getPosts, createPost, deletePost } from './services/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [createError, setCreateError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setFetchError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    setCreating(true);
    setCreateError('');
    try {
      const newPost = await createPost(postData);
      setPosts((prev) => [...prev, newPost]);
    } catch (err) {
      setCreateError('Failed to create post');
    } finally {
      setCreating(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setDeleteError('');
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      setDeleteError('Failed to delete post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Post Management App</h1>
        {deleteError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {deleteError}
          </div>
        )}
        <PostForm onSubmit={handleCreatePost} loading={creating} error={createError} />
        <PostList posts={posts} onDelete={handleDeletePost} loading={loading} error={fetchError} />
      </div>
    </div>
  );
}

export default App;
