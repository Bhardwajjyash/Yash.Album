// redux/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },

  // 👇 Add this block to support "UPDATE_FOLLOWING" from your thunk
  extraReducers: (builder) => {
    builder.addCase("UPDATE_FOLLOWING", (state, action) => {
      if (state.user) {
        state.user.following = action.payload;
      }
    });
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
} = authSlice.actions;

export default authSlice.reducer;
