import ProjectItem from "./ProjectItem";

function ProjectsComp() {
  return (
    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">Projects</h1>
      {/* project list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
          <ProjectItem />
          <ProjectItem />
        </div>
      </div>
    </div>
  );
}

export default ProjectsComp;