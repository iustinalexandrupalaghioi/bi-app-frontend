import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Pie, Bar } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import redPin from "../../../public/placeholder.png";
import { SalesCityData } from "../../../hooks/useSalesMapPoints";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register necessary elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const customIcon = new L.Icon({
  iconUrl: redPin,
  iconSize: [25, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = ({ data }: { data: Record<string, SalesCityData> }) => {
  const renderGenderChart = (genderData: Record<string, number>) => {
    const total = Object.values(genderData).reduce(
      (acc, value) => acc + value,
      0
    );

    const chartData = {
      labels: Object.keys(genderData),
      datasets: [
        {
          data: Object.values(genderData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(2);
              return `${percent}%`;
            },
          },
        },
      },
    };

    return <Pie data={chartData} options={options} />;
  };

  const renderAgeChart = (ageData: Record<string, number>) => {
    const total = Object.values(ageData).reduce((acc, value) => acc + value, 0);

    const chartData = {
      labels: Object.keys(ageData),
      datasets: [
        {
          label: "Age distribution",
          data: Object.values(ageData),
          backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false, // Hides the legend (dataset label)
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(2);
              return `${percent}%`;
            },
          },
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  return (
    <MapContainer
      className="min-h-screen"
      center={[44.4268, 26.1025]} // Center on Bucharest by default
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {Object.entries(data).map(([cityName, cityData]) => (
        <Marker
          key={cityName}
          position={[cityData.latitude, cityData.longitude]}
          icon={customIcon}
        >
          <Popup maxWidth={400} minWidth={300}>
            <h3>{cityName}</h3>
            <p>
              <strong>Total sales:</strong> RON{" "}
              {Number(cityData.total_sales).toFixed(2)}
            </p>
            <p>
              <strong>Average sale:</strong> RON{" "}
              {Number(cityData.average_sale).toFixed(2)}
            </p>
            <p>
              <strong>Transaction count:</strong> {cityData.transaction_count}
            </p>

            <h4>
              <strong>Gender breakdown</strong>
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderGenderChart(cityData.gender_breakdown)}
            </div>

            <h4>
              <strong>Age groups distribution</strong>
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderAgeChart(cityData.age_group_distribution)}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
