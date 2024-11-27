import { FormEvent, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FetchSaleCategoryData {
  sale_id: number;
  book_title: string;
  age: number;
  gender: string;
  sale_date: string;
  quantity: number;
  totalsales: number;
  category_name: string;
}

const SalesPerCategory = () => {
  const [gender, setGender] = useState("All");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [startDate, setStartDate] = useState("2022-10-28");
  const [endDate, setEndDate] = useState("2024-10-28");

  const [data, setData] = useState<FetchSaleCategoryData[]>([]);

  useEffect(() => {
    fetchSalesData({
      gender,
      ageMin: minAge,
      ageMax: maxAge,
      startDate,
      endDate,
    });
  }, [gender, minAge, maxAge, startDate, endDate]);

  const fetchSalesData = async (filters: {
    gender: string;
    ageMin: number;
    ageMax: number;
    startDate: string;
    endDate: string;
  }) => {
    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:5000/api/sales/category-series?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Sales data from API:", data); // Log API data
      setData(data); // Store data in state
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchSalesData({
      gender,
      ageMin: minAge,
      ageMax: maxAge,
      startDate,
      endDate,
    });
  };

  // Prepare chart data without aggregation
  const chartData = {
    labels: data.map((d) => d.category_name), // Use category_name as labels
    datasets: [
      {
        label: "Total Quantity Sold",
        data: data.map((d) => d.totalsales), // Use quantity directly from the data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Sold books per Category" },
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

        <div></div>
        {/* Age range inputs */}
        <div className="flex mb-4">
          <div className="flex flex-col mr-2">
            <label
              className="mb-1 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="minAge"
            >
              Min Age
            </label>
            <input
              type="number"
              id="minAge"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
              min={0}
              max={100}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-1 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="maxAge"
            >
              Max Age
            </label>
            <input
              type="number"
              id="maxAge"
              value={maxAge}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
              min={0}
              max={100}
            />
          </div>
        </div>

        {/* Gender selection */}
        <div className="flex">
          <div className="flex flex-col mb-4">
            <label
              className="mb-1 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
        >
          Refresh data
        </button>
      </form>

      {/* Bar Chart */}
      {data && data.length > 0 ? (
        <div className="w-full h-auto p-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : null}
    </div>
  );
};

export default SalesPerCategory;
