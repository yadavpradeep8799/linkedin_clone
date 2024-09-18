import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setProfile } from '../redux/userSlice';
import { addPost, likePost, addComment, editPost } from '../redux/postsSlice';
import './ProfilePage.css';

// Import images
import defaultProfilePicture from '../assets/pp.jpg'; // Path to profile picture
import coverImage from '../assets/logo.png'; 

interface Profile {
  name: string;
  title: string;
  location: string;
  profilePicture: string;
  bio?: string;
}

const fetchProfileData = (): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Pradeep Yadav',
        title: 'Software Engineer',
        location: 'Saket, India',
        profilePicture: defaultProfilePicture,
        bio: 'Passionate software engineer with 2.6 years of experience.',
      });
    }, 1000);
  });
};

const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedPostContent, setEditedPostContent] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      dispatch(setProfile({ name: '', title: '', location: '', profilePicture: '' }));
      const profileData = await fetchProfileData();
      dispatch(setProfile(profileData));
    };
    loadProfile();
  }, [dispatch]);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      dispatch(addPost({ content: newPost, image: '', tags: '' }));
      setNewPost('');
    }
  };

  const handleEditPost = (id: number, content: string) => {
    setEditingPostId(id);
    setEditedPostContent(content);
  };

  const handleSaveEdit = (id: number) => {
    if (editedPostContent.trim()) {
      dispatch(editPost({ id, content: editedPostContent }));
      setEditingPostId(null);
    }
  };

  const handleLikePost = (id: number) => {
    dispatch(likePost(id));
  };

  const handleAddComment = (postId: number) => {
    if (newComment?.trim()) {
      dispatch(addComment({ postId, comment: newComment }));
      setNewComment('');
    }
  };

  if (!profile) {
    return <div>No profile available.</div>;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-cover">
          {/* <img src={coverImage} alt="Cover" className="cover-image" /> */}
        </div>
        <div className="profile-info">
          <div className="profile-image">
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="profile-picture"
            />
          </div>
          <div className="profile-details">
            <h1>{profile.name}</h1>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-location">{profile.location}</p>
          </div>
        </div>
      </header>
      <section className="profile-bio">
        <h2>About</h2>
        <p>{profile.bio ?? 'No bio available'}</p>
      </section>

      {/* Create New Post */}
      <section className="create-post">
        <h2>Create New Post</h2>
        <textarea
          className='textaArea'
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={handleCreatePost}>Post</button>
      </section>

      {/* Your Posts Section */}
      <section className="profile-posts">
        <h2>Your Posts</h2>
        <ul className="posts-list">
          {posts.length === 0 ? (
            <li>No posts to display.</li>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="post-item">
                {editingPostId === post.id ? (
                  <>
                    <textarea
                      value={editedPostContent}
                      onChange={(e) => setEditedPostContent(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(post.id)}>Save</button>
                  </>
                ) : (
                  <>
                    {post.image && <img src={post.image} alt="Post visual" className="post-image" />}
                    <p>{post.content}</p>
                    <div className="post-actions">
                      <button onClick={() => handleLikePost(post.id)}>Like ({post.likes})</button>
                      <button onClick={() => handleEditPost(post.id, post.content)}>Edit</button>
                      <button onClick={() => console.log('Sharing post')}>Share</button>
                    </div>
                    <div className="post-comments">
                      <h3>Comments:</h3>
                      {post.comments.map((comment, index) => (
                        <p key={index} className="comment">{comment}</p>
                      ))}
                      <textarea
                        className='textaArea2'
                        value={newComment || ''}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                      />
                      <button onClick={() => handleAddComment(post.id)}>Comment</button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default ProfilePage;
