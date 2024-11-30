import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SalesPerCategory from "./pages/SalesPerCategory";
import ExcelExport from "./pages/ExcelExport";

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
        path: "/export-sales-trend",
        element: ExcelExport(),
      },
    ],
  },
]);

export default router;
