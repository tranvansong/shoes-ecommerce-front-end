import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAuth } from "../context/AuthContext";
export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="h-max fixed left-72 top-0 right-0 bg-white p-3.5 shadow-md z-50">
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/4">
          <form className="w-full flex-grow relative">
            <input
              type="text"
              placeholder="Search here..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 outline-blue-500 focus:border-blue-500 block w-full p-3 pr-11"
              required
            />
            <div className="absolute top-3 right-3">
              <button type="submit">
                <SearchIcon style={{ fontSize: "30px" }} />
              </button>
            </div>
          </form>
        </div>
        <div className="flex gap-12 items-center">
          <div className="w-12 h-12 cursor-pointer flex items-center justify-center bg-greylight rounded-full">
            <DarkModeOutlinedIcon style={{ fontSize: "25px" }} />
          </div>

          <div className="w-12 h-12 flex cursor-pointer items-center justify-center bg-greylight rounded-full relative">
            <span>
              <span className="absolute z-10 -top-0.5 -right-0.5 flex justify-center items-center w-4 h-4 rounded-full bg-orange text-white text-sm">
                1
              </span>
              <NotificationsOutlinedIcon style={{ fontSize: "25px" }} />
            </span>
          </div>

          <div className="w-12 h-12 cursor-pointer flex items-center justify-center bg-greylight rounded-full relative">
            <span>
              <span className="absolute z-10 -top-0.5 -right-0.5 flex justify-center items-center w-4 h-4 rounded-full bg-blue-700 text-white text-sm">
                1
              </span>
              <ChatBubbleOutlineOutlinedIcon style={{ fontSize: "25px" }} />
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 cursor-pointer">
              <div>
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={user.avatar}
                />
              </div>
              <div className="flex flex-col items-start">
              <span className="font-bold text-base">{user ? user.name: "Guest"}</span>
              <span className="text-sm text-gray-400">{user ? user.roles.join(', '): "No Role"}</span>
              </div>
          </div>
          <div className="bg-greylight w-0.5 h-12"></div>
          <div className="setting cursor-pointer pr-12">
            <SettingsOutlinedIcon className="animate-spin" style={{fontSize: "35px"}}/>
          </div>
        </div>
      </div>
    </div>
  );
};
