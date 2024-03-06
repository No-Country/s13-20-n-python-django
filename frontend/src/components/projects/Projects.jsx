import projectData from '../../data/projects.json';
import Project from "./Project";
// import { useGetProjectsQuery } from "../../services/projectSlice";

function Projects() {
  // const { data } = useGetProjectsQuery();
  // console.log("Data:" + JSON.stringify(data));

  return (
    <div className='p-4 w-full overflow-auto'>
      <h1 className='text-2xl font-bold'>My Projects</h1>
      {/* project list */}
      <div className=''>
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6'>
          {projectData.map(project => {
              // console.log("project:", project); // Log projectData to check if it's loaded correctly
              return <Project key={project.id} project={project} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;
