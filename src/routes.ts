import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SalesPerCategory from "./pages/SalesPerCategory";
import ExcelExport from "./pages/ExcelExport";
import SalesTrend from "./pages/SalesTrend";

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
        element: ExcelExport(),
      },
    ],
  },
]);

export default router;
