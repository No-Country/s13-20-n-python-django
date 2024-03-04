import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-[250px] px-4 hidden md:inline-block py-14">
      <div className="flex items-baseline space-x-2 px-3 py-4">
        <button
          onClick={() => navigate("/projects/")}
          className="text-lg font-bold w-full px-4"
        >
          Projects
        </button>
      </div>
      <div className="flex items-baseline space-x-2 px-3 py-4">
        <p className="text-lg font-bold w-full px-4">Boards</p>
      </div>
      <div className="flex items-baseline space-x-2 px-3 py-4">
        <p className="text-lg font-bold w-full px-4">Templates</p>
      </div>

      <div className="flex items-baseline space-x-2 px-3 py-24">
        <p className="text-lg font-bold w-full px-4">Settings</p>
      </div>
    </div>
  );
}

export default Sidebar;
