import { FormEvent } from "react";

interface SalesTrendFilterFormProps {
  filters: {
    gender: string;
    ageMin: number;
    ageMax: number;
    startDate: string;
    endDate: string;
    frequency: string;
  };
  setFilters: (filters: any) => void;
  onSubmit: () => void;
}

const SalesTrendFilterForm = ({
  filters,
  setFilters,
  onSubmit,
}: SalesTrendFilterFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      {/* Date Range Inputs */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        <div className="flex flex-col">
          <label
            htmlFor="startDate"
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="endDate"
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Age Range Inputs */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 mt-4">
        <div className="flex flex-col">
          <label
            htmlFor="minAge"
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Min Age
          </label>
          <input
            type="number"
            id="minAge"
            value={filters.ageMin}
            onChange={(e) =>
              setFilters({ ...filters, ageMin: Number(e.target.value) })
            }
            className="px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="maxAge"
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Max Age
          </label>
          <input
            type="number"
            id="maxAge"
            value={filters.ageMax}
            onChange={(e) =>
              setFilters({ ...filters, ageMax: Number(e.target.value) })
            }
            className="px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col mt-4">
        <label
          htmlFor="gender"
          className="mb-1 text-sm text-gray-600 dark:text-gray-300"
        >
          Gender
        </label>
        <select
          id="gender"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="w-fit px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500 mt-1"
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Frequency Selection */}
      <div className="flex flex-col mt-4">
        <label
          htmlFor="frequency"
          className="mb-1 text-sm text-gray-600 dark:text-gray-300"
        >
          Frequency
        </label>
        <select
          id="frequency"
          value={filters.frequency}
          onChange={(e) =>
            setFilters({ ...filters, frequency: e.target.value })
          }
          className="w-fit px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500 mt-1"
        >
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
    </form>
  );
};

export default SalesTrendFilterForm;