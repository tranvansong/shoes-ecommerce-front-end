import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <div className="flex bg-secondary text-gray-400 text-base justify-between items-center px-10 py-4">
        <div>
          <p>World Wide Completely Free Returns and Free Shipping</p>
        </div>
        <div className="flex justify-center items-center">
          <div className="ml-10 flex items-center">
            <PhoneIcon className="mr-2 text-bluelight" style={{ fontSize: "25px" }} />
            <p>0976915002</p>
          </div>
          <div className="ml-10 flex items-center">
            <MailIcon className="mr-2 text-bluelight" style={{ fontSize: "25px" }} />
            <p>songtran02@gmail.com</p>
          </div>
          <div className="ml-10 flex items-center">
            <PersonIcon className="mr-2 text-bluelight" style={{ fontSize: "25px" }} />
            <p>Account</p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-10 py-4">
        <div>
          <img src="images/logoo.png" className="w-28 h-28 object-contain" alt="Logo" />
        </div>
        <div className="w-1/2">
          <form>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon style={{ fontSize: "30px" }} />
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-3 pl-12 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-6">
            <FavoriteBorderIcon style={{ fontSize: "40px" }} />
          </div>
          <Link to="/cart" className="relative">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
            <span className="absolute animate-bounce right-0 top-1 w-5 h-5 place-content-center text-center rounded-full bg-bluelight text-white text-xs">
              3
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="mt-5">
        <nav className="bg-red-500 text-white p-5 flex justify-center mx-10 rounded-t-md">
          <ul className="flex space-x-36">
            <li className="relative">
              <Link to={"/home"} className="text-lg hover:text-gray-100">
                Home
              </Link>
            </li>
            <li className="relative">
              <Link to={"/products"} className="text-lg hover:text-gray-100">
                Shop
              </Link>
            </li>
            <li className="relative">
              <Link to={"/details"} className="text-lg hover:text-gray-100">
                About
              </Link>
            </li>
            <li className="relative">
              <button className="text-lg hover:text-gray-100">
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
