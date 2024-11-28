import { NavLink } from "react-router-dom";
import Accordion from "./Accordion";

const Sidebar = () => (
  <aside className="w-72 min-h-screen py-6 px-4 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="flex flex-col h-full">
      <nav className="space-y-6">
        <Accordion title="Sales Reports">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales per category
          </NavLink>
        </Accordion>
        <Accordion title="Additional Reports">
          <NavLink
            to="/trend-excel"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Trend in Excel
          </NavLink>
        </Accordion>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
