"use client";

import { FaUserCircle } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMenuFlag } from "@/utils/redux/slices/slice";

const Nav: React.FC = () => {
  const selectorData = useSelector((state: any) => state?.slices?.menuFlag);
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    if (!selectorData) {
      dispatch(addMenuFlag(true));
    } else {
      dispatch(addMenuFlag(false));
    }
  };

  return (
    <div className="w-full h-16 bg-[#e7f2fd] shadow flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Left: Logo or Menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            handleMenuToggle();
          }}
          className="text-2xl text-blue-600 hover:text-blue-800"
        >
          <HiOutlineMenuAlt2 />
        </button>

        <h1 className="text-lg font-bold text-blue-800 hidden md:block">
          OUR-DENMARK
        </h1>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-4">
        <button className="relative text-2xl text-blue-700 hover:text-blue-900">
          <MdNotificationsNone />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-blue-700" />
          <span className="hidden md:block text-sm font-medium text-gray-800">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
