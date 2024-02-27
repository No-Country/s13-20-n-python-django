import React, { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import iconDown from "../assets/icon-chevron-down.svg";
import HeaderDropdown from "./HeaderDropdown";

function Navbar({}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex justify-between items-center h-[10vh] px-4 py-3">
      <div className="flex justify-center items-center">
        <a href="/" className="flex items-center justify-center text-2xl">
          <img src={logo} alt="tabula logo" className="h-7" />
          <span className="ml-2">Tabula</span>
        </a>
        <img
          src={iconDown}
          alt=""
          className="w-3 ml-2 mt-2 cursor-pointer md:hidden"
          onClick={() => setOpenMenu((state) => !state)}
        />
      </div>
      <div className="flex justify-center items-center gap-5 md:gap-10">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <input
            type="checkbox"
            value="light"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="profile avatar" src={profile} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <a>Username</a>
            </li>
            <li>
              <a>Edit profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {openMenu && <HeaderDropdown setOpenMenu={setOpenMenu} />}
    </div>
  );
}

export default Navbar;
