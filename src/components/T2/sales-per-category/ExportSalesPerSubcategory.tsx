import { useEffect, useState } from "react";
import useSalesPerSubcategory from "../../../hooks/useSalesPerSubcategory";
import ExportSalesPerSubcategoryForm from "./ExportSalesPerSubcategoryForm";
import ExportSalesPerSubcategoryTable from "./ExportSalesPerSubcategoryTable";

const initialFilters = {
  gender: "All",
  ageMin: 18,
  ageMax: 60,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  category: "All",
};

const ExportSalesPerSubcategory = () => {
  const { filters, data, loading, error, setFilters } =
    useSalesPerSubcategory(initialFilters);

  const [loadingExport, setLoadingExport] = useState(false);
  const [exportError, setExportError] = useState<string>("");
  const [exportSuccess, setExportSuccess] = useState<string>("");

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const buildQueryParams = (
    params: Record<string, string | number | boolean>
  ) =>
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");

  const handleExport = async () => {
    setLoadingExport(true);
    setExportError("");
    setExportSuccess("");

    try {
      const queryString = buildQueryParams({
        startDate: filters.startDate,
        endDate: filters.endDate,
        gender: filters.gender,
        minAge: filters.ageMin,
        maxAge: filters.ageMax,
        category: filters.category,
      });

      const response = await fetch(
        `http://localhost:8000/api/sales/export-subcategory-bar-chart?${queryString}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export sales data.");
      }

      // Convert the response to a Blob (binary data for the file)
      const blob = await response.blob();

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sales_per_category.xlsx"; // Specify the filename for the download

      // Append the link to the document body and trigger the click event to start the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up by removing the link from the DOM

      setExportSuccess("Sales data exported successfully!"); // Success message
    } catch (error) {
      console.error("Error exporting sales data:", error);
      setExportError("Failed to export sales data. Please try again."); // Error message
    } finally {
      setLoadingExport(false); // Hide the loading indicator
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <ExportSalesPerSubcategoryForm
        filters={filters}
        setFilters={setFilters}
      />

      {/* Export Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-fit"
        onClick={handleExport}
        disabled={loadingExport}
      >
        {loadingExport ? "Exporting..." : "Export Sales Data"}
      </button>

      {/* Feedback */}
      {exportSuccess && (
        <div className="text-green-500 font-medium">{exportSuccess}</div>
      )}
      {exportError && <div className="text-red-500">{exportError}</div>}

      {loading && (
        <div className="text-gray-600 dark:text-gray-300">Loading data...</div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}

      {!loading && !error && <ExportSalesPerSubcategoryTable data={data} />}
    </div>
  );
};

export default ExportSalesPerSubcategory;
