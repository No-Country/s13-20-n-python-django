import plus from "../../assets/plus-symbol.jpg";

const AddProject = () => {
  return (
    <div className="card w-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <figure>
        <img src={plus} alt="board image" className="w-full md:w-56 h-36" />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">Add a new project</h2>
      </div>
    </div>
  );
};

export default AddProject;
