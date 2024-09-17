import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Profile interface
interface Profile {
  name: string;
  title: string;
  location: string;
  profilePicture: string;
  bio?: string;
}

// Define the UserState interface
interface UserState {
  profile: Profile | null;
  phoneNumber: string | null;
}

// Define the initial state
const initialState: UserState = {
  profile: null,
  phoneNumber: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    login(state, action: PayloadAction<{ phoneNumber: string }>) {
      state.phoneNumber = action.payload.phoneNumber;
    },
    logout(state) {
      state.profile = null;
      state.phoneNumber = null;
    },
  },
});

// Export the actions and reducer
export const { setProfile, setPhoneNumber, login, logout } = userSlice.actions;
export default userSlice.reducer;
