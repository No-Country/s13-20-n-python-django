import React from "react";
import BoardsList from "../../components/boards/BoardsList";
import Sidebar from "../../components/layout/Sidebar";

const Boards = () => {
  return(
    <>
      <Sidebar />
      <BoardsList />
    </>
  )
};

export default Boards;
