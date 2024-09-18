import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addPost, likePost, addComment } from '../redux/postsSlice';
import './FeedPage.css'; 
import imgProfilee from '../assets/pp.jpg';

const FeedPage: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null); // State to hold the uploaded image
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState<string | null>(null);

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPostImage(file);
  };

  // Handle creating a post
  const handleCreatePost = () => {
    if (newPost.trim() || postImage) {
      const imageUrl = postImage ? URL.createObjectURL(postImage) : ''; // Get image URL for preview
      dispatch(addPost({ content: newPost, image: imageUrl, tags: '' }));
      setNewPost('');
      setPostImage(null);
    }
  };

  // Handle liking a post
  const handleLikePost = (postId: number) => {
    dispatch(likePost(postId));
  };

  // Handle adding a comment
  const handleAddComment = (postId: number) => {
    if (newComment?.trim()) {
      dispatch(addComment({ postId, comment: newComment }));
      setNewComment('');
    }
  };

  return (
    <div className="feed-layout feedWidth">
      {/* Left Sidebar */}
      <aside className="left-sidebar">
        <div className="user-card ">
          <img src={imgProfilee} alt="Profile" className="profile-pic prof" />
          <h3 className="text-align-center">Pradeep Yadav</h3>
          <p className="text-align-center fontSze">Frontend Developer @ Dotvik Solutions</p>
          <p className="text-align-center fontSze">Bachelor of Technology in Computer Science</p>
          <hr />
          <div className="profile-analytics fontSze">
            <p><strong>Profile viewers:</strong> 37</p>
            <p><strong>View all analytics</strong></p>
          </div>
          <hr />
          <div className="saved-items">
            <a href="#">Saved items</a>
          </div>
          <hr />
          <div className="recent-groups">
            <h4>Recent</h4>
            <ul>
              <li>Premium Career Group</li>
              <li>React Js & React Native Devs</li>
              <li>India</li>
              <li>JavaScript Developer</li>
              <li>JavaScript</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Feed Section */}
      <main className="main-feed">
        <div className="post-create-box createPostFeed">
          <textarea
            placeholder="Start a post or draft with AI"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="post-input createTextara"
          />
          <div className="post-options Optnmrgn">
          <button className='optionMp'>Media</button>
            <button className="padBoption">Event</button>
            <button className="padBoption">Write Article</button>
            <button onClick={handleCreatePost} className="post-button postbTn">Post</button>
          </div>
        </div>

        <ul className="feed-posts">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-header">
                <img src={imgProfilee} alt="User" className="post-user-pic" />
                <div className="post-user-info">
                  <h4 className='heading4'>{post.userName}</h4>
                  <p className='paragRaph'>{post.userTitle}</p>
                </div>
              </div>
              {post.image && <img src={post.image} alt="Post visual" className="post-image" />}
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleLikePost(post.id)}>Like ({post.likes})</button>
                <button>Comment</button>
                <button>Share</button>
              </div>
              {/* Comments Section */}
              <div className="post-comments">
                <h3>Comments:</h3>
                {post.comments.map((comment, index) => (
                  <p key={index} className="comment">{comment}</p>
                ))}
                <textarea
                  className="textarea-comment"
                  value={newComment || ''}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(post.id)}>Comment</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <div className="news-section">
          <h4>LinkedIn News</h4>
          <ul>
            <li>Amazon unveils 5-day RTO plan<br />16h ago • 90,923 readers</li>
            <li>Where Indians are moving for work<br />1d ago • 7,253 readers</li>
            <li>Top industry for B-school talent<br />19h ago • 826 readers</li>
            <li>Onsurity raises $45 million<br />19h ago • 17,010 readers</li>
            <li>Smaller cities go the premium way<br />2d ago • 5,610 readers</li>
          </ul>
          <button>Show more</button>
        </div>
        <div className="widgets-section">
          <h4>Today's games</h4>
          <ul>
            <li>Queens<br />6 connections played</li>
            <li>Pinpoint<br />3 connections played</li>
            <li>Crosslink<br />3 connections played</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default FeedPage;
