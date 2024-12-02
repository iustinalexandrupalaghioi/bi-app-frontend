import useSalesPerSubcategory from "../../../hooks/useSalesPerSubcategory";
import ExportSalesPerSubcategoryForm from "./ExportSalesPerSubcategoryForm";

const initialFilters = {
  gender: "All",
  ageMin: 18,
  ageMax: 60,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  category: "All",
};

const ExportSalesPerSubcategory = () => {
  const { filters, loading, error, setFilters } =
    useSalesPerSubcategory(initialFilters);
  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <ExportSalesPerSubcategoryForm
        filters={filters}
        setFilters={setFilters}
      />

      {loading && (
        <div className="text-gray-600 dark:text-gray-300">Loading data...</div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
};

export default ExportSalesPerSubcategory;
