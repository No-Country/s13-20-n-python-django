import { apiSlice } from "./apiSlice.js";

const extendedTokenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createToken: builder.mutation({
      query: (userData) => {
        // body is the email and password
        return { url: "token/", method: "POST", body: userData };
      },
      providesTags: ["token"],
    }),
    refreshToken: builder.mutation({
      query: (refresh_token) => {
        return {
          url: "token/refresh/",
          method: "POST",
          body: refresh_token,
        };
      },
      invalidatesTags: ["token"],
    }),
  }),
});

export const { useCreateTokenMutation, useRefreshTokenMutation } =
  extendedTokenApiSlice;
