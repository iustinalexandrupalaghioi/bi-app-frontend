import useSalesData from "../../../hooks/useSalesData";
import SalesFilterForm from "../sales-per-category/SalesFilterForm";
import SalesBarChart from "../sales-per-category/SalesBarChart";

const SalesPerCategoryChart = () => {
  const { data, filters, setFilters, fetchSalesData } = useSalesData({
    gender: "All",
    ageMin: 0,
    ageMax: 100,
    startDate: "2022-10-28",
    endDate: "2024-10-28",
  });

  const chartData = {
    labels: data.map((d) => d.category_name),
    datasets: [
      {
        label: "Total Quantity Sold",
        data: data.map((d) => d.totalsales),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Sold Books per Category" },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex flex-col gap-4  w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <SalesFilterForm
        filters={filters}
        setFilters={setFilters}
        onSubmit={fetchSalesData}
      />
      {data.length > 0 && (
        <SalesBarChart
          key={JSON.stringify(chartData)}
          data={chartData}
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default SalesPerCategoryChart;
