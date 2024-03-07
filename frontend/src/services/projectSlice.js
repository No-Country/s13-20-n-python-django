import { apiSlice } from "./apiSlice.js";

// For what should go inside projectData check the documentation
const extendedProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "tasks/projects",
      providesTags: ["projects"],
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `tasks/projects/${projectId}/`,
      }),
      providesTags: ["project"],
    }),
    createNewProject: builder.mutation({
      query: (projectData) => ({
        url: "tasks/projects/create/",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["projects"],
    }),
    updateProject: builder.mutation({
      query: (projectData) => ({
        url: `tasks/projects/update/${projectData.id}/`,
        method: "PUT",
        body: projectData,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `tasks/projects/delete/${projectId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectQuery,
  useGetProjectsQuery,
  useCreateNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = extendedProjectApiSlice;
