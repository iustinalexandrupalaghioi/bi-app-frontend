import SalesPerCategory from "./pages/SalesPerCategory";
import SalesTrend from "./pages/SalesTrend";

const App = () => {
  return (
    <div className="flex flex-col mx-auto overflow-hidden bg-white shadow-lg dark:bg-gray-800 w-full min-h-screen">
      <SalesPerCategory />
      <SalesTrend />
    </div>
  );
};

export default App;
