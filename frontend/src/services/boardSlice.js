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
    }),
    createNewBoard: builder.mutation({
      query: (boardData) => ({
        url: "tasks/boards/",
        method: "POST",
        body: boardData,
      }),
    }),
    updateBoard: builder.mutation({
      query: (boardData) => ({
        url: `tasks/boards/${boardData.id}/`,
        method: "PUT",
        body: boardData,
      }),
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `tasks/boards/${boardId}/`,
        method: "DELETE",
      }),
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
