import React from "react";
import { useParams } from "react-router-dom";
import BoardComp from '../../components/boards/Board'
import Sidebar from "../../components/layout/Sidebar";

const Board = () => {
  const { boardId } = useParams();

  return(
    <>
      <Sidebar />
      <BoardComp />
    </>
  );
};

export default Board;
