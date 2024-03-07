import plus from "../../assets/plus-symbol.jpg";
import { useState } from "react";
import { useCreateNewBoardMutation } from "../../services/boardSlice";
import PropTypes from 'prop-types';

const AddBoard = ({ projectId }) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createNewBoard, { data, isLoading, isError }] =
    useCreateNewBoardMutation();

  function handleAddBoard(e) {
    e.preventDefault();
    console.log(name, description, projectId);
    createNewBoard({ name, description, project: projectId });
    setName("");
    setDescription("");
    document.getElementById("add_board_modal").close();
  }
  return (
    <>
      <div className="card w-full md:w-56 bg-base-100 image-full shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
        <figure>
          <img src={plus} alt="board image" className="w-full md:w-56 h-36" />
        </figure>
        <div
          className="card-body p-3"
          onClick={() =>
            document.getElementById("add_board_modal").showModal()
          }>
          <h2 className="card-title">Add a new board</h2>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="add_board_modal"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add new board</h3>
          <form method="dialog">
            <input
              type="text"
              placeholder="Type board name here (e.g. 'TODO')"
              className="input input-bordered input-primary w-full mb-3"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Add a description"
              className="input input-bordered input-primary w-full h-20"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn btn-primary" onClick={handleAddBoard}>
                Add board
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

AddBoard.propTypes = {
  projectId: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.number.isRequired,
  }).isRequired
}

export default AddBoard;
