import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
interface SalesBarChartProps {
  data: {
    labels: string[];
    datasets: any[];
  };
  options: any;
}

const SalesBarChart = ({ data, options }: SalesBarChartProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Chart
        type="bar"
        key={JSON.stringify(data)}
        data={data}
        options={options}
      />
    </div>
  );
};

export default SalesBarChart;
