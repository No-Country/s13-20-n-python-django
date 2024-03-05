import ProjectItem from "./ProjectItem";
import projectData from '../../data/projects.json'

function ProjectsComp() {
  return (
    
    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">My Projects</h1>
      {/* project list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
        {projectData.map((project, index) => (
            <ProjectItem key={index} project={project} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsComp;
