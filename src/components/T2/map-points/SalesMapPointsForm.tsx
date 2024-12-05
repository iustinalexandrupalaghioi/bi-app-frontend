interface ExportSalesPerSubcategoryFormProps {
  filters: {
    startDate: string;
    endDate: string;
  };
  setFilters: (filters: any) => void;
}

const ExportSalesPerSubcategoryForm = ({
  filters,
  setFilters,
}: ExportSalesPerSubcategoryFormProps) => {
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
    </form>
  );
};

export default ExportSalesPerSubcategoryForm;
