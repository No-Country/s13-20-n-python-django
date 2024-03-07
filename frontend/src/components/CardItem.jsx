import { FaTasks } from "react-icons/fa";
import { IoMdList } from "react-icons/io";
import { MdPriorityHigh } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import avatar from "../assets/profile.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDeleteTaskMutation } from "../services/taskSlice";

function CardItem({ task }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTask, { isLoading, data, isError }] = useDeleteTaskMutation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const priorityText = (priority) => {
    switch (priority) {
      case 1:
        return "Not important";
      case 2:
        return "Delegate";
      case 3:
        return "Important";
      case 4:
        return "Urgent";
      default:
        return "No priority assigned";
    }
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
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => openModal(task)}>View card</a>
              </li>
              <li
                onClick={() => {
                  deleteTask(task.id);
                }}>
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
          onClick={closeModal}>
          <div
            className="modal-box bg-base-300"
            onClick={(e) => e.stopPropagation()}>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="flex flex-row items-center pt-0 pb-4 gap-2 font-bold text-lg">
              <FaTasks /> {task.name}
            </h3>
            <p className="flex flex-row items-center gap-2 font-bold py-4">
              <IoMdList />
              Description
            </p>
            <p className="ps-2 ms-8 py-2 text-sm rounded">{task.description}</p>
            <p className="flex flex-row items-center gap-2 py-4">
              <MdPriorityHigh />
              <span className="font-bold">Priority: </span>
              {priorityText(task.priority)}
            </p>
            <p className="flex flex-row items-center gap-2 py-4">
              <FaUser />
              <span className="font-bold">Assigned to: </span>
              {task.assigned_user}
            </p>
            <p className="flex flex-row items-center gap-2 font-bold py-4">
              <RxActivityLog />
              Activity
            </p>
            <div className="flex flex-row join">
              <img className="w-8 h-8 rounded-full mr-2 " src={avatar} />
              <input
                type="text"
                placeholder="Write a comment"
                className="input input-bordered rounded-r-none w-full input-sm"
              />
              <button className="btn btn-primary btn-sm join-item">
                Add comment
              </button>
            </div>
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
    description: PropTypes.string,
    priority: PropTypes.number,
    assigned_user: PropTypes.string,
  }).isRequired,
};

export default CardItem;
