import React from "react";
import { useParams } from "react-router-dom";

const Milestone = () => {
  const { milestoneId } = useParams();

  return <div>Milestone</div>;
};

export default Milestone;
