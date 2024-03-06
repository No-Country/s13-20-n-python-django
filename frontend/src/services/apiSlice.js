import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Change to production url later
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers, { getState }) => {
      headers.set("Content-type", "application/json");
      const token = getState().auth.access;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}), // needed, else we can't inject endpoints
});
