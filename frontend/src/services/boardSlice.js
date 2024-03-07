import { apiSlice } from "./apiSlice.js";

// For what should go inside boardData check the documentation
const extendedProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Don't use this endpoint, get the data from projects
    getBoards: builder.query({
      query: () => "tasks/boards",
    }),
    getBoard: builder.query({
      query: (BoardId) => ({
        url: `tasks/boards/${BoardId}/`,
      }),
      providesTags: ["board"],
    }),
    createNewBoard: builder.mutation({
      query: (boardData) => ({
        url: "tasks/boards/create/",
        method: "POST",
        body: boardData,
      }),
      invalidatesTags: ["project"],
    }),
    updateBoard: builder.mutation({
      query: (boardData) => ({
        url: `tasks/boards/update/${boardData.id}/`,
        method: "PUT",
        body: boardData,
      }),
      providesTags: ["board"],
      invalidatesTags: ["project", "board"],
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `tasks/boards/delete/${boardId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["project", "board"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateNewBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = extendedProjectApiSlice;
