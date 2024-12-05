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

          <NavLink
            to="/sales-trend"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales trend
          </NavLink>

          <NavLink
            to="/sales-trend-discount"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 mt-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales trend remake
          </NavLink>
        </Accordion>
        <Accordion title="Additional Reports">
          <NavLink
            to="/export-sales-trend"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales trend
          </NavLink>

          <NavLink
            to="/export-sales-subcategory-series"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 mt-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales per subcategory
          </NavLink>

          <NavLink
            to="/export-sales-by-event"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 mt-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Sales by event
          </NavLink>

          <NavLink
            to="/sales-cities"
            className={({ isActive }) =>
              isActive
                ? "flex items-center px-4 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                : "flex items-center px-4 py-2 mt-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg"
            }
          >
            Map points sales
          </NavLink>
        </Accordion>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
