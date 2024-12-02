import React from "react";
import ExportSalesPerSubcategory from "../components/T2/sales-per-category/ExportSalesPerSubcategory";

const ExcelExportSalesPerSubcategory = () => {
  return (
    <div className="flex flex-col md:flex-row mx-8 my-6 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full">
      <ExportSalesPerSubcategory />
    </div>
  );
};

export default ExcelExportSalesPerSubcategory;
