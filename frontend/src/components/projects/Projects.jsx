import ProjectItem from "./ProjectItem";
import { useGetProjectsQuery } from "../../services/projectSlice";

function Projects() {
  const { data, isLoading, isError } = useGetProjectsQuery();
  console.log(data, isError);

  return (
    <div className='p-4 w-full overflow-auto'>
      <h1 className='text-2xl font-bold'>My Projects</h1>
      {/* project list */}
<<<<<<< HEAD
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
          {projectData.map((project, id) => (
            <ProjectItem key={id} project={project} board={project} />
        ))}
=======
      <div className=''>
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6'>
          {isLoading || isError ? (
            <div>loading</div>
          ) : (
            data.map((project, index) => (
              <ProjectItem key={index} project={project} board={project} />
            ))
          )}
>>>>>>> 69bd5f0b6c2e9ca1d4c08e846528bfe7ce3c2037
        </div>
      </div>
    </div>
  );
}

export default Projects;
