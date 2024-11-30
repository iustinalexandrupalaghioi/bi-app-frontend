import { FetchSalesData } from "../../../hooks/useExportTrend";

const ExportDataTable = ({ data }: { data: FetchSalesData[] }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] bg-gray-900 text-white">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left text-white">
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Sale ID
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Book Title
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Age
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Age Group
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Age Group Description
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Gender
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Sale Date
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Quantity
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Total Sales
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale) => (
            <tr
              key={sale.sale_id}
              className="hover:bg-gray-700 dark:hover:bg-gray-600 text-white"
            >
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.sale_id}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.book_title}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.age}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.age_group}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.age_group_description}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.gender}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.sale_date}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.quantity}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.total_sales}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {sale.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportDataTable;
