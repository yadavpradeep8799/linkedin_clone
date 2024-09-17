import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addPost } from '../redux/postsSlice';
import './FeedPage.css';

const FeedPage: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    if (newPost.trim()) {
      dispatch(addPost({ content: newPost, image: '', tags: '' }));
      setNewPost('');
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-create-post">
        <h2 className="feed-heading">What’s on your mind?</h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a post..."
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      <section className="feed-posts">
        <h2 className="feed-heading">Posts</h2>
        <ul className="posts-list">
          {posts.length === 0 ? (
            <li className="no-posts">No posts yet. Be the first to share!</li>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="post-item">
                {post.image && <img src={post.image} alt="Post visual" className="post-image" />}
                <p className="post-content">{post.content}</p>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default FeedPage;
