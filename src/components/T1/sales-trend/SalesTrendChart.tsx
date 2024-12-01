import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import SalesTrendFilterForm from "./SalesTrendFilterForm";
import SalesLineChart from "./SalesLineChart";
import useSalesTrend from "../../../hooks/useSalesTrend";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SalesTrendChart = () => {
  const { data, filters, setFilters, fetchSalesData } = useSalesTrend(
    {
      gender: "All",
      ageMin: 0,
      ageMax: 100,
      startDate: "2022-10-28",
      endDate: "2024-10-28",
      frequency: "Monthly",
    },
    "trend"
  );

  const chartData = {
    labels: data.map((d) => d.sale_date),
    datasets: [
      {
        label: "Total Sales",
        data: data.map((d) => d.totalSales),
        borderColor: "rgba(54, 162, 235, 1)", // Blue line
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Optional fill color (semi-transparent blue)
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4  w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <SalesTrendFilterForm
        filters={filters}
        setFilters={setFilters}
        onSubmit={fetchSalesData}
      />
      {data.length > 0 && (
        <SalesLineChart
          key={JSON.stringify(chartData)}
          data={chartData}
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default SalesTrendChart;
