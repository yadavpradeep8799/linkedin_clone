// src/pages/CreatePostPage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postsSlice';
import './CreatePostPage.css';

const CreatePostPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (content.trim()) {
      dispatch(addPost({ content, image, tags }));
      setContent('');
      setImage('');
      setTags('');
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a Post</h1>
      <textarea
        className="create-post-textarea"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        className="create-post-input"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        className="create-post-input"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button onClick={handleSubmit} className="create-post-button">Post</button>
    </div>
  );
};

export default CreatePostPage;
