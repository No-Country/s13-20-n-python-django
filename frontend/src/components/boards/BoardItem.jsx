import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useDeleteBoardMutation } from "../../services/boardSlice";

function BoardItem({ board }) {
  const navigate = useNavigate();
  const { id, name, description } = board;
  const [deleteBoard, { data, isLoading, isError }] = useDeleteBoardMutation();

  return (
    <div className="group relative card w-full max-h-36 md:w-56 bg-base-100 image-full shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <figure>
        <img
          src={`https://picsum.photos/224/144?random=${id}`}
          alt="board image"
          className="w-full md:w-56 h-36"
        />
      </figure>
      <div className="card-body max-w-56 p-3">
        <div className="dropdown dropdown-end absolute top-1 right-1">
          <div
            tabIndex={0}
            role="button"
            className="hidden w-8 h-8 group-hover:grid place-content-center rounded-md hover:text-black hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-primary"
          >
            <li>
              <a>Rename board</a>
            </li>
            <li
              onClick={() =>
                document.getElementById("confirm_delete_modal").showModal()
              }
            >
              <a>Delete board</a>
            </li>
          </ul>
        </div>
        <h2
          className="card-title line-clamp-1"
          onClick={() => navigate(`/projects/boards/${id}/`)}
        >
          {name}
        </h2>
      </div>

      {/* Modals */}
      {/* Confirm delete */}
      <dialog
        id="confirm_delete_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm</h3>
          <p className="py-4">
            Are you sure you want to delete the board? This action can not be
            undone. <br />
            Press ESC key or click the X to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  deleteBoard(id);
                }}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

BoardItem.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default BoardItem;
