import Project from "./Project";
import AddProject from "./AddProject";
import { useGetProjectsQuery } from "../../services/projectSlice";

function Projects() {
  const { data, isError, isLoading } = useGetProjectsQuery();

  return (
    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">My Projects</h1>
      {/* project list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
          {isLoading || isError ? (
            <div>Loading...</div>
          ) : (
            data.map((project) => {
              return <Project key={project.id} project={project} />;
            })
          )}
          <AddProject />
        </div>
      </div>
    </div>
  );
}

export default Projects;
