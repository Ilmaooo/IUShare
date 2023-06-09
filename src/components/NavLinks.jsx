import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <div className="text-right">
      {links.map((link) => (
        <div key={link.name}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex items-center md:pr-0 pr-5 group cursor-pointer transition-colors duration-300 ease-in-out hover:text-primary"
              onMouseEnter={() => {
                setHeading(link.name);
                setSubHeading("");
              }}
              onMouseLeave={() => setHeading("")}
            >
              {link.name}
              <span className="text-xl md:hidden ml-2">
                <ion-icon
                  name={`${
                    heading === link.name ? "chevron-up" : "chevron-down"
                  }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2 hidden md:block group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.submenu && (
              <div
                className={`${
                  (heading === link.name || subHeading === link.name) ? "block" : "hidden"
                } absolute right-20 top-20 bg-white bg-opacity-70 backdrop-filter backdrop-blur-md shadow-lg rounded-lg transition-all duration-300 ease-in-out`}
                onMouseEnter={() => setHeading(link.name)}
                onMouseLeave={() => setHeading("")}
              >
                <div className="py-3">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white transform rotate-45"></div>
                </div>
                <div className="p-5 grid grid-cols-4 gap-6">
                  {link.sublinks.map((mysublinks) => (
                    <div key={mysublinks.Head}>
                      <h1 className="text-lg font-semibold mb-2">
                        {mysublinks.Head}
                      </h1>
                      {mysublinks.sublink.map((slink) => (
                        <li
                          key={slink.name}
                          className="text-sm text-[#005696] mb-1 hover:text-emerald-400 hover:scale-110"
                        >
                          <Link
                            to={slink.link}
                            className="transition-colors duration-300 hover:text-primary"
                          >
                            {slink.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div className={`${heading === link.name ? "md:hidden" : "hidden"}`}>
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div key={slinks.Head}>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold flex justify-between items-center cursor-pointer transition-colors duration-300 ease-in-out hover:text-primary"
                  >
                    {slinks.Head}
                    <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "block" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink) => (
                      <li key={slink.name} className="py-3 pl-14">
                        <Link
                          to={slink.link}
                          className="transition-colors duration-300 hover:text-primary"
                        >
                          {slink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
