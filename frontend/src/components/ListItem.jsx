import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import CardItem from "./CardItem";
import PropTypes from "prop-types";
import { animations } from "@formkit/drag-and-drop";
import { useState } from "react";
import { useCreateNewTaskMutation } from "../services/taskSlice";
import { useNavigate } from "react-router-dom";

function ListItem({ list }) {
  const [cardTitle, setCardTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [listId, setListId] = useState(list.id);
  const [parent, tasks] = useDragAndDrop(list.list_task, {
    group: "lists",
    plugins: [animations()],
  });
  const [createNewTask, { data, isError, isLoading }] =
    useCreateNewTaskMutation();
  function handleAddCard(event) {
    event.preventDefault();
    console.log(listId, cardTitle, description, priority);
    createNewTask({ list: listId, name: cardTitle, description, priority });
    setCardTitle("");
    setPriority("");
    setDescription("");
  }
  return (
    <div className="w-72 max-h-full flex flex-col rounded-md border-2">
      {/* list header */}
      <div className="flex items-center justify-between px-3 py-2 list-handle">
        <h3 className="text-sm font-semibold ">{list.title}</h3>
        {/* list menu button */}
        <button className="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {/* list dropdown menu */}
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <p className="pb-2 font-semibold">Actions</p>
            <li>
              <a
                onClick={() =>
                  document.getElementById(`add-${listId}`).showModal()
                }>
                Add card
              </a>
            </li>
            <li>
              <a>Move list</a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a className="menu-dropdown-toggle">Order by...</a>
              <ul className="menu-dropdown">
                <li>
                  <a>Date ascending</a>
                </li>
                <li>
                  <a>Date descending</a>
                </li>
                <li>
                  <a>Name (A-Z)</a>
                </li>
                <li>
                  <a>Name (Z-A)</a>
                </li>
              </ul>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a
                onClick={() =>
                  document.getElementById(`delete-${listId}`).showModal()
                }
                className="text-red-500">
                Remove list
              </a>
            </li>
          </ul>
        </button>
      </div>
      {/* list content */}
      <div className="pb-3 flex flex-col overflow-hidden">
        <div className="px-3 flex-1 overflow-y-auto">
          <ul ref={parent} className="space-y-3 py-3">
            {tasks.map((task) => (
              <CardItem key={task.id} task={task} />
            ))}
          </ul>
        </div>
      </div>
      <div className="px-3 pb-3 mt-3">
        <button className="flex items-center p-2 text-sm font-medium hover:text-black hover:bg-gray-300 w-full rounded-md">
          +
          <span
            className="ml-1"
            onClick={() =>
              document.getElementById(`add-${listId}`).showModal()
            }>
            Add card
          </span>
        </button>
      </div>

      {/* Modals */}
      <dialog
        id={`add-${listId}`}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Add a new task (or press ESC to exit)
          </h3>
          <input
            type="text"
            placeholder="Type name here"
            className="input input-bordered input-lg w-full"
            value={cardTitle}
            onChange={(event) => {
              setCardTitle(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Type priorty"
            className="input input-bordered input-lg w-full"
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
            }}
            max={4}
            min={1}
          />
          <input
            type="text"
            placeholder="Type description here"
            className="input input-bordered input-lg w-full"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn" onClick={handleAddCard}>
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id={`delete-${listId}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete list</h3>
          <p className="py-4">
            Are you sure you want to delete this list? Press ESC key or close
            this window to cancel.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

ListItem.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    list_task: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number,
    board: PropTypes.number,
  }).isRequired,
};

export default ListItem;
