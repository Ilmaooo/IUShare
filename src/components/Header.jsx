import logo from "../img/iushare-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { useState } from "react";
import { IoExitOutline } from "react-icons/io5";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="flex items-center font-medium justify-between">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer h-9"
            onClick={() => navigate("/home")}
          />
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-10 font-[Poppins] text-[#005696] justify-end flex-grow mr-3 z-50">
            <li
              className={`cursor-pointer py-7 px-3 inline-block border-b-[3px] ${
                pathMathRoute("/home")
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <NavLinks />
            <li
              className={`cursor-pointer py-7 px-3 inline-block border-b-[3px] ${
                pathMathRoute("/profile")
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
            <Link
              to="/"
              className="cursor-pointer py-7 px-3 inline-block text-xl"
            >
              <IoExitOutline />
            </Link>
          </ul>
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none" onClick={() => setOpen(!open)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {open && (
            <ul className="mt-2 space-y-2">
              <li
                className={`cursor-pointer py-2 px-4 border-b-[1px] ${
                  pathMathRoute("/home")
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setOpen(false);
                  navigate("/home");
                }}
              >
                Home
              </li>
              <NavLinks setOpen={setOpen} />
              <li
                className={`cursor-pointer py-2 px-4 border-b-[1px] ${
                  pathMathRoute("/profile")
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}
