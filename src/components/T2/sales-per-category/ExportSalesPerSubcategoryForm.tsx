import useCategories from "../../../hooks/useCategories";

interface ExportSalesPerSubcategoryFormProps {
  filters: {
    category?: string | undefined;
    gender?: string;
    ageMin?: number;
    ageMax?: number;
    startDate: string;
    endDate: string;
  };
  setFilters: (filters: any) => void;
}

const ExportSalesPerSubcategoryForm = ({
  filters,
  setFilters,
}: ExportSalesPerSubcategoryFormProps) => {
  const { categories } = useCategories();

  return (
    <form className="max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        {/* Date range inputs */}
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

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 mt-4">
        {/* Age range inputs */}
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

      <div className="mt-4 w-fit">
        {/* Gender selection */}
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
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500 mt-1"
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      {categories && categories.length > 0 && (
        <div className="mt-4 w-fit">
          {/* Gender selection */}
          <label
            htmlFor="category"
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-200 focus:ring focus:ring-gray-500 mt-1"
          >
            <option value="All">All</option>
            {categories.map((c) => (
              <option key={c.category_name} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default ExportSalesPerSubcategoryForm;
