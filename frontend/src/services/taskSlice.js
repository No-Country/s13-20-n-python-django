import { apiSlice } from "./apiSlice.js";

// For what should go inside taskData check the documentation. Note that this code needs to be refactored to update the current cache.
const extendedProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (taskId) => ({
        url: `tasks/tasks/${taskId}/`,
      }),
    }),
    createNewTask: builder.mutation({
      query: (taskData) => ({
        url: "tasks/tasks/create/",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["board"],
    }),
    updateTask: builder.mutation({
      query: (taskData) => ({
        url: `tasks/tasks/update/${taskData.id}/`,
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: ["board"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks/tasks/delete/${taskId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["board"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = extendedProjectApiSlice;
