import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { profile: null, token: null },
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload.userData;
      state.token = action.payload.token;
    },
  },
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;