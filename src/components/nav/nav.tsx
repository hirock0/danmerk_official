"use client";
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
import { FiUser } from "react-icons/fi";
import { FaUnlockAlt } from "react-icons/fa";
import { BiPowerOff } from "react-icons/bi";

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

  useEffect(() => {
    const handler = () => {
      setLeftSideBar(false), setSidebarVisible(false);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);
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
            onClick={(e) => {
              e.stopPropagation(), handleMenuToggle2();
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
                onClick={(e) => {
                  e.stopPropagation(), setSidebarVisible(!sidebarVisible);
                }}
                className="flex items-center gap-2 cursor-pointer"
                // Toggle sidebar visibility
              >
                <Image
                  src={user?.image || "/default-avatar.png"}
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

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          !leftSideBar ? " -translate-x-[110%] " : " translate-x-0"
        } transition-all fixed z-40 md:hidden left-0 top-[54px] h-[calc(100vh-54px)] custom-scrollbar overflow-y-scroll`}
      >
        <SideBar />
      </div>

      {/* Sidebar */}

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          !sidebarVisible ? "hidden" : "block"
        } transition-all fixed top-[60px] right-5 rounded-lg overflow-hidden bg-white w-52  shadow-lg z-40 `}
      >
        <div className="bg-white h-full  flex flex-col">
          <div className="flex flex-col ">
            <Link href="/profile">
              <div className="flex p-4 items-center gap-2 border-b-2 py-4 text-blue-600">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="user"
                  width={500}
                  height={500}
                  className=" w-8 h-8 rounded-full"
                />
                <span>{user?.name}</span>
              </div>
            </Link>

            <div className="hover:bg-slate-200/50 ">
              <Link href="/pages">
                <div className="flex p-4 hover:text-blue-600 items-center gap-2 text-gray-800  py-4 ">
                  <FiUser size={20} />
                  <span>My Profile</span>
                </div>
              </Link>
            </div>

            <div className="hover:bg-slate-200/50 ">
              <Link href="/pages">
                <div className="flex p-4 items-center gap-2 hover:text-blue-600 text-gray-800 border-b-2 pb-4 ">
                  <FaUnlockAlt size={20} />
                  <span>Password</span>
                </div>
              </Link>
            </div>

            <div className="hover:bg-slate-200/50">
              <div
                className="flex p-4 items-center gap-2 text-gray-800  hover:text-blue-600 cursor-pointer py-4"
                onClick={handleLogout}
              >
                <BiPowerOff size={20} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
