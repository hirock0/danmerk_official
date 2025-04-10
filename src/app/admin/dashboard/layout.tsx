import AdminSidebar from "@/components/admin/adminSideBar/adminSideBar";
import Md_sideBar from "@/components/md_sideBar/md_sideBar";
import Nav from "@/components/nav/nav";
import SideBar from "@/components/sideBar/sideBar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <div className="">
        <Nav />
      </div>
      <div className=" flex h-[calc(100vh-4rem)]">
        
        <div className=" max-md:hidden text-nowrap overflow-y-scroll">
            <AdminSidebar/>
        </div>

        <div className="  w-full overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
