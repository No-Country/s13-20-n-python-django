import CardItem from "./CardItem";
import PropTypes from "prop-types";

function ListItem({ list }) {
  
  return (
    <div className="w-72 max-h-full flex flex-col rounded-md border-2">
      {/* list header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold ">{list.title}</h3>
        {/* list menu button */}
        <button className="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
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
                  document.getElementById("add_card_modal").showModal()
                }
              >
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
                  document.getElementById("delete_card_modal").showModal()
                }
                className="text-red-500"
              >
                Remove list
              </a>
            </li>
          </ul>
        </button>
      </div>
      {/* list content */}
      <div className="pb-3 flex flex-col overflow-hidden">
        <div className="px-3 flex-1 overflow-y-auto">
          <ul className="space-y-3">
            {list.list_task.map((task) => (
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
              document.getElementById("add_card_modal").showModal()
            }
          >
            Add card
          </span>
        </button>
      </div>

      {/* Modals */}
      <dialog
        id="add_card_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Add a new task (or press ESC to exit)
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-lg w-full"
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn">Add</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="delete_card_modal" className="modal">
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
  }).isRequired,
};

export default ListItem;
