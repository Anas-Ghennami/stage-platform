import Topbar from "./TopBar";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const role = location.pathname.split("/")[1];
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1">
        <Topbar role={role} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;