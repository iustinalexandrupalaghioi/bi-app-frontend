import SalesTrendRemakeLineChart from "./SalesTrendRemakeLineChart";
import SalesTrendRemakeForm from "./SalesTrendRemakeForm";
import useSalesTrendWithDiscounts, {
  Filters,
} from "../../../hooks/useSalesTrendWithDiscounts";

// Default initial filters
const initialFilters: Filters = {
  gender: "All",
  ageMin: 18,
  ageMax: 60,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  frequency: "Monthly",
  trendType: "linear",
  predictionPoints: 1,
};

const SalesTrendRemake = () => {
  const { data, filters, setFilters } =
    useSalesTrendWithDiscounts(initialFilters);

  // Prepare the chart data by creating combined datasets for current and future trends
  const chartData = {
    // Collect all unique dates from both current trend and future trend data of all available discounts
    labels: data
      ? Array.from(
          new Set(
            Object.values(data).flatMap((discountData: any) => [
              ...discountData.trend.map((item: any) => item.date),
              ...discountData.future_trend.map((item: any) => item.date),
            ])
          )
        )
      : [], // Combine all dates from trend and future_trend

    datasets: data
      ? Object.entries(data).map(
          ([discountRate, discountData]: [string, any]) => {
            const trendData = discountData.trend.map(
              (item: any) => item.trend_value
            );
            const futureTrendData = discountData.future_trend.map(
              (item: any) => item.trend_value
            );

            return [
              {
                label: `Discount ${discountRate}% (Current Trend)`,
                data: trendData, // Only current trend data
                borderColor: `hsl(${
                  (parseFloat(discountRate) * 60) % 360
                }, 70%, 50%)`, // Color for current trend
                tension: 0.4, // Smooth curve
                pointRadius: 4, // Points on the line
              },
              {
                label: `Discount ${discountRate}% (Future Trend)`,
                data: futureTrendData, // Only future trend data
                borderColor: `hsl(${
                  (parseFloat(discountRate) * 60 + 180) % 360
                }, 70%, 50%)`, // Color for future trend
                tension: 0.4, // Smooth curve
                pointRadius: 4, // Points on the line
                borderDash: [5, 5], // Dashed line for future trend
              },
            ];
          }
        )
      : [], // Empty datasets if no data
  };

  console.log(data);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date", // Label for the X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales", // Label for the Y-axis
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {/* Filter Form Component */}
      <SalesTrendRemakeForm filters={filters} setFilters={setFilters} />

      {/* Render the chart only when the data is available */}
      {data ? (
        <SalesTrendRemakeLineChart
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets.flat(), // Flatten the datasets array for rendering
          }}
          options={options}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SalesTrendRemake;
