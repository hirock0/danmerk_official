"use client";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addMenuFlag } from "@/utils/redux/slices/slice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigating after logout
import swal from "sweetalert"; // Import sweetalert

const Nav: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to control sidebar visibility

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
    <div>
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

          <div className=" flex items-center gap-2">
            <Image
              src={"https://order.denmarkofficial.online/images/logo.png"}
              alt="logo"
              width={500}
              height={500}
              className=" w-10 h-10"
            />

            <h1 className="text-[22px] font-serif font-bold tracking-wide text-[#4154f1] hidden md:block">
              OUR-DENMARK
            </h1>
          </div>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center gap-4">
          <button className="relative text-2xl text-blue-700 hover:text-blue-900">
            <MdNotificationsNone />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Display user image or login button */}
          {user ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setSidebarVisible(!sidebarVisible)} // Toggle sidebar visibility
            >
              <Image
                src={user?.image || "/default-avatar.png"} // fallback image if user doesn't have one
                alt="User Image"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </span>
            </div>
          ) : (
            <Link href="/login">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Login
              </button>
            </Link>
          )}
        </div>
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
                  <HiOutlineMenuAlt2 />
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
