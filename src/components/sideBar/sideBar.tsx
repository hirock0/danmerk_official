"use client";

import {
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import {
  MdOutlineLocalPhone,
  MdOutlineLanguage,
} from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPowerOff, FaQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BsCaretLeft } from "react-icons/bs";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiFileCopyLine } from "react-icons/ri";
import { FaIdCard } from "react-icons/fa6";
interface SubmenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: any;
  label: string;
  href?: string;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
}

const SideBar: React.FC = () => {
  const selectorData = useSelector((state: any) => state?.slices?.menuFlag);

  const pathname = usePathname(); // 👈 get current path
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuItems: MenuItem[] = [
    { icon: <BsSpeedometer2/>, label: "অর্ডার ড্যাশবোর্ড", href: "/dashboard" },
    { icon: <BsCaretLeft/>, label: "ফিরে যান", href: "#" },
    { icon: <IoDocumentTextOutline />, label: "সাইন কপি অর্ডার", href: "/sign-copy" },
    {
      icon: <RiFileCopyLine />,
      label: "সার্ভার কপি অর্ডার",
      href: "/server-copy-order",
    },
    { icon: <FaIdCard />, label: "আইডি কার্ড অর্ডার", href: "/nid-order" },

    {
      icon: <TbReportAnalytics />,
      label: "বায়োমেট্রিক",
      hasSubmenu: true,
      submenu: [
        { label: "গ্রামিন", href: "/biometric/gp" },
        { label: "বাংলালিংক", href: "/biometric/banglalink" },
        { label: "রবি/এয়ারটেল", href: "/biometric/robi-airtel" },
        { label: "টেলিটক", href: "/biometric/teletalk" },
      ],
    },

    {
      icon: <FaIdCard />,
      label: "এন,আই,ডি-টু নম্বর",
      hasSubmenu: true,
      submenu: [
        { label: "NID To (গ্রামিন নাম্বার)", href: "/nid/gp" },
        { label: "NID To (বাংলালিংক নাম্বার)", href: "/nid/banglalink" },
        { label: "NID To (রবি/এয়ারটেল নাম্বার)", href: "/nid/robi-airtel" },
        { label: "NID To (টেলিটক নাম্বার)", href: "/nid/teletalk" },
      ],
    },

    {
      icon: <MdOutlineLocalPhone />,
      label: "কল লিস্ট অর্ডার",
      hasSubmenu: true,
      submenu: [
        { label: "কল লিস্ট (১ মাসের)", href: "/call-list/1month" },
        { label: "কল লিস্ট (৬ মাসের)", href: "/call-list/6month" },
      ],
    },

    {
      icon: <FaBars />,
      label: "লোকেশন",
      hasSubmenu: true,
      submenu: [
        { label: "গ্রামিন", href: "/location/gp" },
        { label: "বাংলালিংক", href: "/location/banglalink" },
        { label: "রবি/এয়ারটেল", href: "/location/robi-airtel" },
      ],
    },

    {
      icon: <MdOutlineLanguage />,
      label: "বিকাশ ইনফো",
      hasSubmenu: true,
      submenu: [
        { label: "গ্রামিন", href: "/location/gp" },
        { label: "বাংলালিংক", href: "/location/banglalink" },
        { label: "রবি/এয়ারটেল", href: "/location/robi-airtel" },
      ],
    },

    {
      icon: <BsFillPersonFill />,
      label: "জিরো রিটার্ন দাখিল",
      href: "#",
    },
    {
      icon: <BsFillPersonFill />,
      label: "ইউজার পাস সেট",
      href: "#",
    },
    {
      icon: <BsFillPersonFill />,
      label: "রিচার্জ",
      href: "#",
    },
  ];

  const settings = [
    { icon: <BsFillPersonFill />, label: "প্রোফাইল", href: "/profile" },
    { icon: <FaIdCard />, label: "পাসওয়ার্ড পরিবর্তন", href: "#" },
    { icon: <FaQuestionCircle />, label: "সাপোর্ট", href: "#" },
    { icon: <FaPowerOff />, label: "Logout", href: "#" },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div
      className={` bg-[#e7f2fd]  text-zinc-500 text-[17px]  ${
        selectorData ? " w-20" : " "
      } duration-300 p-4`}
    >
      <div className="flex items-center justify-between my-5 ">
        <h2 className="text-xl ">{!selectorData && "Dashboard"}</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = item.href && pathname === item.href;
          const isSubActive =
            item.submenu?.some((sub) => pathname === sub.href) ?? false;

          return (
            <div key={index} className="relative rounded-md">
              <button
                className={`flex items-center  justify-between rounded-md transition  px-3 py-2 ${
                  isActive || isSubActive
                    ? "bg-blue-600 text-white "
                    : " hover:bg-blue-200"
                }`}
                onClick={() => item.hasSubmenu && toggleSubmenu(item.label)}
              >
                <div className="flex items-center space-x-8">
                  <span className="text-2xl font-bold">{item.icon}</span>
                  {!selectorData && <span>{item.label}</span>}
                </div>

                {!selectorData && item.hasSubmenu && (
                  <FaChevronRight
                    className={`text-sm transition-transform ${
                      openMenu === item.label ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {!item.hasSubmenu && item.href && (
                <Link href={item.href} className="absolute inset-0 z-10" />
              )}

              {item.hasSubmenu && openMenu === item.label && !selectorData && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu?.map((sub, subIndex) => {
                    const subActive = pathname === sub.href;
                    return (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className={`block text-sm p-1 pl-4 rounded ${
                          subActive
                            ? "bg-blue-300 text-blue-900 font-medium"
                            : "text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* Bottom: Settings */}
      <div className="pt-6 mt-6 border-t border-blue-300 space-y-3">
        {!selectorData && <h2 className=" font-semibold">Setting</h2>}
        <div className=" ">
          {settings.map((item: any, index) => (
            <div className="" key={index}>
              <Link
                href={item?.href}
                
                className={` ${
                  pathname === item?.href
                    ? "bg-blue-600  text-white font-semibold"
                    : " hover:bg-blue-200"
                } flex items-center px-3 py-2 space-x-8 rounded cursor-pointer`}
              >
                <div className="">{item?.icon}</div>
                {!selectorData && <span>{item?.label}</span>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
