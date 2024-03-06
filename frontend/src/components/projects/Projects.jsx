import ProjectItem from "./ProjectItem";
import projectData from '../../data/projects.json';
import { useGetProjectsQuery } from "../../services/projectSlice";

function Projects() {
  const { data, isLoading, isError } = useGetProjectsQuery();
  console.log(data, isError);

  return (
    <div className='p-4 w-full overflow-auto'>
      <h1 className='text-2xl font-bold'>My Projects</h1>
      {/* project list */}
      <div className=''>
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6'>
          {/* {isLoading || isError ? (
            <div>loading</div>
          ) : (
            projectData.map((project, index) => (
              <ProjectItem key={index} project={project} board={project} />
            ))
          )} */}
          {
            projectData.map((project, index) => (
              <ProjectItem key={index} project={project} board={project} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Projects;
