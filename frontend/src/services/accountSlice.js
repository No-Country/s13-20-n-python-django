import { apiSlice } from "./apiSlice.js";

// For what should go inside userData check the documentation
const extendedAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "user/",
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}/`,
      }),
    }),
    createNewUser: builder.mutation({
      query: (userData) => ({
        url: "user/",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `user/${userData.id}/`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = extendedAccountApiSlice;
