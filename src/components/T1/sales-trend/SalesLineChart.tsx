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

interface SalesLineChartProps {
  data: {
    labels: string[];
    datasets: any[];
  };
  options: any;
}

const SalesLineChart = ({ data, options }: SalesLineChartProps) => {
  console.log(data, options);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {data.labels.length > 0 ? (
        <Line key={JSON.stringify(data)} data={data} options={options} />
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No data available
        </p>
      )}
    </div>
  );
};

export default SalesLineChart;
