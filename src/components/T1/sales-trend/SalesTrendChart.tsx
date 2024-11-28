import { FormEvent, useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";

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

interface FetchSaleTrendData {
  date?: string; // Used for daily data
  month?: string; // Used for monthly data
  year?: number; // Used for yearly data
  totalSales: number;
}

const SalesTrendChart = () => {
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState("2022-10-28");
  const [endDate, setEndDate] = useState("2024-10-28");

  const [data, setData] = useState<FetchSaleTrendData[]>([]);

  useEffect(() => {
    fetchSalesTrendData({ startDate, endDate, frequency });
  }, [startDate, endDate, frequency]);

  const fetchSalesTrendData = async (filters: {
    startDate: string;
    endDate: string;
    frequency: string;
  }) => {
    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:5000/api/sales/trend?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setData(data); // Store data in state
    } catch (error) {
      console.error("Error fetching sales trend data:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSalesTrendData({ startDate, endDate, frequency });
  };

  // Prepare chart data for line chart
  const chartData = {
    labels: data.map((d) => {
      if (frequency === "Daily") return d.date;
      if (frequency === "Monthly") return d.month;
      return d.year;
    }),
    datasets: [
      {
        label: "Total Sales USD",
        data: data.map((d) => d.totalSales),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: `Sales Trend (${frequency})` },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl p-4 border-e border-gray-100"
      >
        {/* Date range inputs */}
        <div className="flex mb-4">
          <div className="flex flex-col mr-2">
            <label
              className="mb-1 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
              required
            />
          </div>
        </div>

        {/* Frequency selection */}
        <div className="flex flex-col mb-4">
          <label
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
            htmlFor="frequency"
          >
            Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="Daily">Daily</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
        >
          Refresh Data
        </button>
      </form>

      {/* Line Chart */}
      {data && data.length > 0 ? (
        <div className="w-full h-auto p-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : null}
    </div>
  );
};

export default SalesTrendChart;
