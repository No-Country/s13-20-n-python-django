import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, refresh_token: null, token: null },
  reducers: {
    setCredentials: (
      state,
      { payload: { refresh_token, token, username } },
    ) => {
      state.refresh_token = refresh_token;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
