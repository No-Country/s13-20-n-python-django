/* eslint-disable react/prop-types */
import React from "react";
import ListItem from "../ListItem";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const BoardSorter = ({ data }) => {
  const [parent, lists] = useDragAndDrop(data.list_set, {
    plugins: [animations()],
    dragHandle: ".list-handle",
  });
  return (
    <>
      <div
        ref={parent}
        className="inline-flex h-full items-start px-4 pb-4 space-x-4"
      >
        {lists.map((list) => {
          return (
            <ListItem
              key={list.id}
              list={list}
              id={list.id}
              data-id={list.id}
            />
          );
        })}
      </div>
      <div className="inline-flex w-72 items-start h-full px-4 pb-4 space-x-4">
        <button
          onClick={() => document.getElementById("add_list_modal").showModal()}
          className="flex items-center w-full hover:bg-white/20 p-3 text-sm font-medium rounded-md border-2"
        >
          +<span className="ml-1">Add another list</span>
        </button>
      </div>

      {/* Modals */}
      <dialog
        id="add_list_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add new list</h3>
          <div className="modal-action">
            <form className="w-full" method="dialog">
              <input
                type="text"
                placeholder="Type list name here"
                className="input input-bordered input-primary w-full"
                // value={name}
                // onChange={(event) => setName(event.target.value)}
              />
              {/* if there is a button in form, it will close the modal */}
              <div className="modal-action">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <button className="btn btn-primary">Add list</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BoardSorter;
