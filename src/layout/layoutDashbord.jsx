import { useState } from "react";
import Topbar from "./TopBar";
import Sidebar from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const role = location.pathname.split("/")[1];

  // !! NEW STATE (mobile sidebar)
  const [openSidebar, setOpenSidebar] = useState(false);



  return (
    <div className="flex  ">
      {/* SIDEBAR */}


      {/* Overlay flou after sidebar quite  */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}


      <Sidebar
        className=""
        role={role}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div className="flex-1 lg:ml-72">
        <Topbar
          role={role}
          setOpenSidebar={setOpenSidebar}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;