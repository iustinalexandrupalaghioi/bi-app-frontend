import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SalesPerCategory from "./pages/SalesPerCategory";
import ExcelExportTrendLine from "./pages/ExcelExportTrendLine";
import SalesTrend from "./pages/SalesTrend";
import ExcelExportSalesPerSubcategory from "./pages/ExcelExportSalesPerSubcategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: Layout(),
    children: [
      {
        index: true,
        element: SalesPerCategory(),
      },
      {
        path: "/sales-trend",
        element: SalesTrend(),
      },
      {
        path: "/export-sales-trend",
        element: ExcelExportTrendLine(),
      },
      {
        path: "/export-sales-subcategory-series",
        element: ExcelExportSalesPerSubcategory(),
      },
      {
        path: "/export-sales-by-event",
        element: ExcelExportSalesPerSubcategory(),
      },
    ],
  },
]);

export default router;
