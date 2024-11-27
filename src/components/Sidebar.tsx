import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-600 transition-colors duration-300 transform bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-200`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-2 ps-4">{children}</div>}
    </div>
  );
};

const Sidebar = () => (
  <aside className="flex flex-col w-72 min-h-screen py-8 px-4 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700">
    <div className="flex flex-col justify-between flex-1 mt-6">
      <nav>
        <Accordion title="Sales Reports">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-4 py-2 mb-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center ps-4 py-2 mb-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 rounded-lg"
            }
          >
            Sales per category
          </NavLink>
          <NavLink
            to="/sales-trend"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-4 py-2 mb-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center ps-4 py-2 mb-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 rounded-lg"
            }
          >
            Sales trend
          </NavLink>
        </Accordion>
        <Accordion title="Additional Reports">
          <NavLink
            to="/sales-by-event"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-4 py-2 mb-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center ps-4 py-2 mb-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 rounded-lg"
            }
          >
            Sales by event
          </NavLink>
          <NavLink
            to="/stock-needs"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-4 py-2 mb-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center ps-4 py-2 mb-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 rounded-lg"
            }
          >
            Stock needs
          </NavLink>
          <NavLink
            to="/trend-excel"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-4 py-2 mb-2 text-white bg-gray-700 rounded-lg"
                : "flex items-center ps-4 py-2 mb-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 rounded-lg"
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
