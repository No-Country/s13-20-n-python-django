import ProjectItem from "./ProjectItem";
import projectData from '../../data/projects.json'

function Projects() {
  return (

    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">My Projects</h1>
      {/* project list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
          {projectData.map((project, id) => (
            <ProjectItem key={id} project={project} board={project} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;