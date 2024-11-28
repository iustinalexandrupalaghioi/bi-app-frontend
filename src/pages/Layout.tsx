import { Outlet } from "react-router";
import Sidebar from "../components/partials/Sidebar";

const Layout = () => {
  return (
    <div className="flex mx-auto overflow-hidden bg-white shadow-lg dark:bg-gray-800 w-full min-h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
