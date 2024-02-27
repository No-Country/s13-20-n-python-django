import React from "react";
import Sidebar from "./Sidebar";
import Board from "./Board";
import BoardsList from "./BoardsList";

function Center() {
  return (
    <div className="flex h-[80vh]">
      <Sidebar />
      {/* <Board /> */}
      <BoardsList />
    </div>
  );
}

export default Center;
