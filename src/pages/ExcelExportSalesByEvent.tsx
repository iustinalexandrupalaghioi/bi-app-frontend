import ExportSalesByEvent from "../components/T2/sales-by-event/ExportSalesByEvent";

const ExcelExportSalesByEvent = () => {
  return (
    <div className="flex flex-col md:flex-row mx-8 my-6 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full">
      <ExportSalesByEvent />
    </div>
  );
};

export default ExcelExportSalesByEvent;
