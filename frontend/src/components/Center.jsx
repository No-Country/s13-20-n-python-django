import React from "react";
import Sidebar from "./Sidebar";
import Board from "./Board";
import BoardsList from "./BoardsList";

function Center() {
  return (
    <div>
      <Sidebar />
      <BoardsList />
    </div>
  );
}

export default Center;
