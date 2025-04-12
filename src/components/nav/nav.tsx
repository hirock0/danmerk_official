"use client";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addMenuFlag } from "@/utils/redux/slices/slice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigating after logout
import swal from "sweetalert"; // Import sweetalert
import { IoIosMenu } from "react-icons/io";
import { IoCaretDownSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import SideBar from "../sideBar/sideBar";

const Nav: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to control sidebar visibility
  const [leftSideBar, setLeftSideBar] = useState<boolean>(false);
  const selectorData = useSelector((state: any) => state?.slices?.menuFlag);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleMenuToggle = () => {
    if (!selectorData) {
      dispatch(addMenuFlag(true));
    } else {
      dispatch(addMenuFlag(false));
    }
  };

  const handleMenuToggle2 = () => {
    if (!leftSideBar) {
      setLeftSideBar(true);
    } else {
      setLeftSideBar(false);
    }
  };

  useEffect(() => {
    const handleUser = async () => {
      try {
        const response = await axios.get("/pages/api/users/decodedUser"); // ✅ Correct path
        const userData = response?.data?.data;
        setUser(userData);
      } catch (error) {
        console.error("Error in handleUser function:", error);
      }
    };

    handleUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API route to clear the token
      await axios.post("/pages/api/users/logout");

      // Clear the user from state
      setUser(null);

      // Show SweetAlert for successful logout
      swal({
        title: "Logout Successful",
        text: "You have been logged out successfully.",
        icon: "success",
      }).then(() => {
        // Redirect to login page after the user acknowledges the SweetAlert
        router.push("/user/login");
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="">
      <div className="w-full h-[54px] bg-[#e7f2fd] shadow flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
        {/* Left: Logo or Menu button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleMenuToggle();
            }}
            className="text-2xl max-md:hidden text-blue-600 hover:text-blue-800"
          >
            <IoIosMenu />
          </button>

          <button
            onClick={() => {
              handleMenuToggle2();
            }}
            className="text-2xl md:hidden text-blue-600 hover:text-blue-800"
          >
            <IoIosMenu />
          </button>

          <div className=" flex items-center gap-2">
            <Image
              src={"https://order.denmarkofficial.online/images/logo.png"}
              alt="logo"
              width={500}
              height={500}
              className=" w-[35px] h-[35px]"
            />

            <h1 className="text-[22px] font-serif font-bold -tracking-[1px] text-[#4154f1] hidden md:block">
              OUR-DENMARK
            </h1>
          </div>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center gap-6">
          <div className=" bg-blue-600 text-white px-3 py-2 rounded-md">
            টাকা - 1524
          </div>

          <button className="relative text-2xl text-blue-700 hover:text-blue-900">
            <IoMdNotificationsOutline />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Display user image or login button */}
          {user ? (
            <div className=" flex gap-1 items-center">
              <div
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="flex items-center gap-2 cursor-pointer"
                // Toggle sidebar visibility
              >
                <Image
                  src={user?.image || "/default-avatar.png"} // fallback image if user doesn't have one
                  alt="User Image"
                  width={500}
                  height={500}
                  className=" w-[35px] h-[35px] rounded-full object-cover"
                />

                <button className="relative text-black hover:text-blue-900">
                  <IoCaretDownSharp
                    className={`${sidebarVisible && "rotate-180"}`}
                  />
                </button>
              </div>
            </div>
          ) : (
            <Link href="/user/login">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className={`${!leftSideBar?" -translate-x-[110%] ":" translate-x-0"} transition-all fixed z-40 md:hidden left-0 top-[54px] h-[calc(100vh-54px)] custom-scrollbar overflow-y-scroll`}>
        <SideBar />
      </div>

      {/* Sidebar */}
      {sidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-64 h-full p-4 flex flex-col">
            <button
              className="text-xl text-blue-700 hover:text-blue-900 mb-4"
              onClick={() => setSidebarVisible(false)} // Close sidebar
            >
              X
            </button>

            <div className="flex flex-col gap-6">
              <Link href="/profile">
                <div className="flex items-center gap-2 text-gray-800 hover:text-blue-600">
                  <FaUserCircle />
                  <span>Profile</span>
                </div>
              </Link>

              <Link href="/pages">
                <div className="flex items-center gap-2 text-gray-800 hover:text-blue-600">
                  <IoIosMenu />
                  <span>Pages</span>
                </div>
              </Link>

              <div
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
