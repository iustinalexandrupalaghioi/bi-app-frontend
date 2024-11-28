import SalesPerCategoryChart from "../components/T1/sales-per-category/SalesPerCategoryChart";

const SalesPerCategory = () => {
  return (
    <div className="flex md:flex-row mx-8 my-4 overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
      <SalesPerCategoryChart />
    </div>
  );
};

export default SalesPerCategory;
