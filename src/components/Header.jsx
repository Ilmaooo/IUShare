import logo from "../img/iushare-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { useState } from "react";

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
            className="cursor-pointer h-9 "
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 font-[Poppins] text-[#005696] justify-end flex-grow mr-3 z-50">
            <li
              className={`cursor-pointer py-7 px-3 inline-block border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-blue-800 border-b-[#005696]"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <NavLinks />
            <li
              className={`cursor-pointer py-7 px-3 inline-block border-b-[3px] border-b-transparent ${
                pathMathRoute("/log-in") && "text-blue-800 border-b-[#005696]"
              }`}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
