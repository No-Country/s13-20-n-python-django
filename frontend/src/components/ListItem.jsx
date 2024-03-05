import React from "react";
import CardItem from "./CardItem";
import taskData from '../data/task.json'

function ListItem({list}) {

  const {name} = list

  return (
    <div className="w-72 max-h-full flex flex-col rounded-md border-2">
      {/* list header */}
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-sm font-semibold ">{name}</h3>
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
              <a>Add card</a>
            </li>
            <li>
              <a>Move list</a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a>Order by...</a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a className="text-red-500">Remove list</a>
            </li>
          </ul>
        </button>
      </div>
      {/* list content */}
      <div className="pb-3 flex flex-col overflow-hidden">
        <div className="px-3 flex-1 overflow-y-auto">
          <ul className="space-y-3">
            {taskData.map((task, index) => (
              <CardItem key={index} task={task} />
            ))}
            <CardItem />
          </ul>
        </div>
      </div>
      <div className="px-3 pb-3 mt-3">
        <button className="flex items-center p-2 text-sm font-medium hover:text-black hover:bg-gray-300 w-full rounded-md">
          +<span className="ml-1">Add card</span>
        </button>
      </div>
    </div>
  );
}

export default ListItem;
