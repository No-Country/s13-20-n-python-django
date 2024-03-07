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
        url: "tasks/lists/create",
        method: "POST",
        body: listData,
      }),
      invalidatesTags: ["board"],
    }),
    updateList: builder.mutation({
      query: (listData) => ({
        url: `tasks/lists/update/${listData.id}/`,
        method: "PUT",
        body: listData,
      }),
      invalidatesTags: ["board"],
    }),
    deleteList: builder.mutation({
      query: (listId) => ({
        url: `tasks/lists/delete/${listId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["board"],
    }),
  }),
});

export const {
  useGetListQuery,
  useCreateNewListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
} = extendedProjectApiSlice;
