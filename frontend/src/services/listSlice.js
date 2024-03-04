import { apiSlice } from "./apiSlice.js";

// For what should go inside listData check the documentation. Note that this code needs to be refactored to update the current cache.
const extendedProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getList: builder.query({
      query: (listId) => ({
        url: `tasks/lists/${listId}/`,
      }),
    }),
    createNewList: builder.mutation({
      query: (listData) => ({
        url: "tasks/lists/",
        method: "POST",
        body: listData,
      }),
    }),
    updateList: builder.mutation({
      query: (listData) => ({
        url: `tasks/lists/${listData.id}/`,
        method: "PUT",
        body: listData,
      }),
    }),
    deleteList: builder.mutation({
      query: (listId) => ({
        url: `tasks/lists/${listId}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetListQuery,
  useCreateNewListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = extendedProjectApiSlice;
