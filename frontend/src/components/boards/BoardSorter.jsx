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
    <div
      ref={parent}
      className="inline-flex h-full items-start px-4 pb-4 space-x-4"
    >
      {lists.map((list) => {
        return (
          <ListItem key={list.id} list={list} id={list.id} data-id={list.id} />
        );
      })}
      <div className="w-72">
        <button className="flex items-center w-full hover:bg-white/20 p-2 text-sm font-medium rounded-md border-2">
          +<span className="ml-1">Add another list</span>
        </button>
      </div>
    </div>
  );
};

export default BoardSorter;