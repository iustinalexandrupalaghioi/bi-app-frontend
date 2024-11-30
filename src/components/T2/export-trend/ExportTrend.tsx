import ExportTrendForm from "./ExportTrendForm";
import useSalesData from "../../../hooks/useExportTrend";
import ExportData from "./ExportDataTable";
import { useState } from "react";

const ExportTrend = () => {
  const initialFilters = {
    gender: "All",
    ageMin: 18,
    ageMax: 60,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    frequency: "Monthly",
    trendType: "linear",
    predictionYears: 1,
  };

  const { data, filters, setFilters, fetchSalesData, loading, error } =
    useSalesData(initialFilters);

  const [loadingExport, setLoadingExport] = useState(false);
  const [exportError, setExportError] = useState<string>("");
  const [exportSuccess, setExportSuccess] = useState<string>("");

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
        frequency: filters.frequency,
        trendType: filters.trendType,
        predictionYears: filters.predictionYears,
        gender: filters.gender,
        minAge: filters.ageMin,
        maxAge: filters.ageMax,
      });

      const response = await fetch(
        `http://localhost:8000/api/sales/export-sales?${queryString}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export sales data.");
      }

      setExportSuccess("Sales data exported successfully!");
    } catch (error) {
      console.error("Error exporting sales data:", error);
      setExportError("Failed to export sales data. Please try again.");
    } finally {
      setLoadingExport(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <ExportTrendForm
        filters={filters}
        setFilters={setFilters}
        onSubmit={fetchSalesData}
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

      {!loading && !error && <ExportData data={data} />}
    </div>
  );
};

export default ExportTrend;
