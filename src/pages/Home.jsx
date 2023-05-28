import { Avatar } from "@mui/material";
import React, { useState} from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import 'firebase/compat/firestore';
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleInputChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   // handle the user's search input here
  //   console.log(searchTerm);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-blue-300 ">
        <div className="justify-self-start float-left inset-y-0 left-0 p-4">
          <nav className="float-left inset-y-0 left-0 p-4 text-center">
            <Avatar alt="User Avatar" onClick={handleClick}>
              <VscAccount />
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/">Sing-out</Link>
              </MenuItem>
            </Menu>
          </nav>
        </div>
        <div className="justify-self-end float-right inset-y-0 right-0 px-6 py-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 pr-2 rounded">
            <Link to="/share-notes">Share Note</Link>
          </button>
        </div>
      </div>

      <div >
         <SearchBar />
      </div>
     
      

      <div className="w-5/6 mx-auto mt-10 space-x-56 container">
        <div className="bg-white shadow-md rounded px-8 py-4">
          <h3 className="text-lg font-bold mb-4">Top Rated Shared Note</h3>
          <hr className="mb-4" />
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-2">Note Title</h4>
              <p className="text-gray-700 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                consequat euismod sapien, vel accumsan nisl vestibulum et.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
