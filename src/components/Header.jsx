import React from "react";
import logo from "../img/iushare-logo.png";
import { Link } from "react-router-dom";
import Button from "./Button";
import NavLinks from "./NavLinks";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white m-auto">
        <div className="flex items-center font-medium justify-between">
          <div className="z-50 p-5 md:w-auto w-full flex items-center">
            <img src={logo} alt="logo" className="md:cursor-pointer h-9 " />
            <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>

          <ul className="md:flex hidden  items-center gap-8 font-[Poppins] text-[#005696] justify-end flex-grow mr-3">
            <li>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </li>
            <NavLinks />
            <li>
              <Link to="profile" className="py-7 px-3 inline-block">
                Profile
              </Link>
            </li>
          </ul>

          <div className="md:block hidden"></div>
          {/* Mobile nav */}
          <ul
            className={`
          md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
          duration-500 ${open ? "left-0" : "left-[-100%]"}
          `}
          >
            <li>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </li>
            <NavLinks />
            <div className="py-5">
              <Button />
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
