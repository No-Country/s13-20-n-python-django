import { apiSlice } from "./apiSlice.js";

// For what should go inside projectData check the documentation
const extendedProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "tasks/projects",
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `tasks/projects/${projectId}/`,
      }),
    }),
    createNewProject: builder.mutation({
      query: (projectData) => ({
        url: "tasks/projects/",
        method: "POST",
        body: projectData,
      }),
    }),
    updateProject: builder.mutation({
      query: (projectData) => ({
        url: `tasks/projects/${projectData.id}/`,
        method: "PUT",
        body: projectData,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `tasks/projects/${projectId}/`,
        method: "DELETE",
      }),
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
