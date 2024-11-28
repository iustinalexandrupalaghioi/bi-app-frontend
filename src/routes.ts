import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import SalesPerCategory from "./pages/SalesPerCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: Layout(),
    children: [
      {
        index: true,
        element: SalesPerCategory(),
      },
    ],
  },
]);

export default router;
