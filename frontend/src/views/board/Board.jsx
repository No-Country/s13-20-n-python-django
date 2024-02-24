import React from "react";
import { useParams } from "react-router-dom";

const Board = () => {
  const { boardId } = useParams();

  return <div>Board</div>;
};

export default Board;
