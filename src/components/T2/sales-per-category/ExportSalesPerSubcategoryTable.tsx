import { FetchSalesSubcategoryData } from "../../../hooks/useSalesPerSubcategory";

const ExportSalesPerSubcategoryTable = ({
  data,
}: {
  data: FetchSalesSubcategoryData[];
}) => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] bg-gray-900 text-white">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left text-white">
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Subcategory
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Total sales
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr
              key={index}
              className="hover:bg-gray-700 dark:hover:bg-gray-600 text-white"
            >
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.subcategory_name}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.total_sales}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportSalesPerSubcategoryTable;
