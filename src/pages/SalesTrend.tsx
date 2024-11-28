import SalesTrendChart from "../components/T1/sales-trend/SalesTrendChart";

const SalesTrend = () => {
  return (
    <div className="flex flex-col md:flex-row mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full">
      <SalesTrendChart />
    </div>
  );
};

export default SalesTrend;
