import useSalesMapPoints from "../../../hooks/useSalesMapPoints";
import SalesMapComponent from "./SalesMapComponent";
import SalesMapPointsForm from "./SalesMapPointsForm";

const SalesMap = () => {
  const { data, loading, error, filters, setFilters } = useSalesMapPoints({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    gender: "All",
    ageMin: 18,
    ageMax: 60,
    category: "All",
  });

  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <SalesMapPointsForm filters={filters} setFilters={setFilters} />

      {loading && <p>Loading map data...</p>}
      {error && <p>Error: {error}</p>}
      {data && <SalesMapComponent data={data} />}
    </div>
  );
};

export default SalesMap;
