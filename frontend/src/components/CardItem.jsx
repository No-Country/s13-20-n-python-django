import { FaTasks } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

function CardItem({ task }) {
  // console.log(task);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
      <div className="inline-flex h-full w-full items-start ps-4 pb-4 space-x-4">
        <li key={task.id} className="group w-full relative p-3">
          <a onClick={openModal} className="text-sm font-medium cursor-pointer">
            {task.name}
          </a>

          <div className="dropdown dropdown-left absolute top-1 right-1">
            <button className="hidden w-8 h-8 group-hover:grid place-content-center rounded-md hover:text-black hover:bg-gray-200">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => openModal(task)}>View card</a>
              </li>
              <li>
                <a>Remove card</a>
              </li>
            </ul>
          </div>
        </li>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <dialog
          id={`view_card_modal_${task.id}`}
          className="modal"
          open
          onClick={closeModal}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
                <FaTasks /> {task.name}
            </h3>
            <p className="py-4">{task.description}</p>
            <p className="py-4">Priority: {task.priority}</p>
            <p className="py-4">Assigned to: {task.assigned_user}</p>
          </div>
        </dialog>
      )}
    </div>
  );
}

CardItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default CardItem;
