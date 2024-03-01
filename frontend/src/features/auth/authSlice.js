import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { refresh: null, access: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
