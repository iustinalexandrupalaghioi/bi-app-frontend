import SalesTrendChart from "../components/T1/sales-trend/SalesTrendChart";

const SalesTrend = () => {
  return (
    <div className="flex md:flex-row mx-8 my-4 overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
      <SalesTrendChart />
    </div>
  );
};

export default SalesTrend;
