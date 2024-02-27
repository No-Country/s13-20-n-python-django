import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
