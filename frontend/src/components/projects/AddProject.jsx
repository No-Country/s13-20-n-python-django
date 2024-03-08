import plus from "../../assets/plus-symbol.jpg";
import { useState } from "react";
import { useCreateNewProjectMutation } from "../../services/projectSlice";

const AddProject = () => {

  const [name, setName] = useState("");
  const [createNewProject, { data, isLoading, isError }] =
    useCreateNewProjectMutation();

  function handleAddProject(e) {
    e.preventDefault();
    console.log(name);
    createNewProject({ name, member: [] });
    setName("");
    document.getElementById("add_project_modal").close()
  }

  return (
    <>
      <div className="card w-full image-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
        <figure>
          <img src={plus} alt="board image" className="w-full md:w-56 h-36" />
        </figure>
        <div
          className="card-body p-3"
          onClick={() =>
            document.getElementById("add_project_modal").showModal()
          }>
          <h2 className="card-title">Add a new project</h2>
        </div>
      </div>

      {/* Modal */}
      {/* Add project */}
      <dialog
        id="add_project_modal"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add new project</h3>
          <form method="dialog">
            <input
              type="text"
              placeholder="Type project name here"
              className="input input-bordered input-primary w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {/* if there is a button in form, it will close the modal */}
            <div className="modal-action">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn btn-primary" onClick={handleAddProject}>
                Add project
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddProject;
