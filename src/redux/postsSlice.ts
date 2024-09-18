import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import imagePost from '../assets/pp.jpg';

interface Post {
  id: number;
  userName: string;  // New field for user's name
  userTitle: string; // New field for user's job title
  content: string;
  image: string;
  tags: string;
  likes: number;
  comments: string[];
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [
    {
      id: 1,
      userName: 'Pradeep Yadav',
      userTitle: 'Frontend Developer @ Dotvik Solutions',
      content: 'This is my first post!',
      image: imagePost, // corrected to use the imported image
      tags: '#first #post',
      likes: 10,
      comments: ['Great post!', 'Congrats on your first post!'],
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<{ content: string; image: string; tags: string }>) => {
      const newPost: Post = {
        id: state.posts.length + 1,
        userName: 'Pradeep Yadav', // Default or dynamic user name
        userTitle: 'Frontend Developer @ Dotvik Solutions', // Default or dynamic user title
        content: action.payload.content,
        image: action.payload.image,
        tags: action.payload.tags,
        likes: 0,
        comments: [],
      };
      state.posts.push(newPost);
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: number; comment: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    editPost: (state, action: PayloadAction<{ id: number; content: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.id);
      if (post) {
        post.content = action.payload.content;
      }
    },
  },
});

export const { addPost, likePost, addComment, editPost } = postsSlice.actions;
export default postsSlice.reducer;
