"use client";
import { useSelector } from "react-redux";
import SideBar from "../sideBar/sideBar";

const Md_sideBar = () => {
  const selectorData = useSelector((state: any) => state?.slices?.menuFlag);
  return (
    <div className={` md:hidden fixed left-0 top-16 z-40 ${!selectorData ? "-translate-x-full" : " translate-x-0"} transition-all duration-300`}>
      <SideBar />
    </div>
  );
};

export default Md_sideBar;
