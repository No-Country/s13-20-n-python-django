import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import iconDown from "../../assets/icon-chevron-down.svg";
import HeaderDropdown from "../HeaderDropdown";

function Navbar() {
  useEffect(() => {
    themeChange(false);
    // false parameter is required for react project
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex justify-between items-center h-[10vh] px-4 py-3">
      <div className="flex justify-center items-center">
        <a href="/" className="flex items-center justify-center text-2xl">
          <img src={logo} alt="tabula logo" className="h-7" />
          <span className="ml-2 text-primary">Tabula</span>
        </a>
        <img
          src={iconDown}
          alt=""
          className="w-3 ml-2 mt-2 cursor-pointer md:hidden"
          onClick={() => setOpenMenu((state) => !state)}
        />
      </div>
      <div className="flex justify-center items-center gap-5 md:gap-10">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary m-1 md:text-xs">
            Theme
            <svg
              width="12px"
              height="12px"
              className="h-2 w-2 fill-current opacity-60 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-48"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Default"
                value="default"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                value="valentine"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Halloween"
                value="halloween"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Lo-Fi"
                value="lofi"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Coffee"
                value="coffee"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Nord"
                value="nord"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Pastel"
                value="pastel"
              />
            </li>
          </ul>
        </div>
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
