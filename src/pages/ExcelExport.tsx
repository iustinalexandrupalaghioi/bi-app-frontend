import ExportTrend from "../components/T2/export-trend/ExportTrend";

const ExcelExport = () => {
  return (
    <div className="flex flex-col md:flex-row mx-8 my-6 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full">
      <ExportTrend />
    </div>
  );
};

export default ExcelExport;
