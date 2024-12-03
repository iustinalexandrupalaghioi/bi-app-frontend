import { EventSales } from "../../../hooks/useSalesByEvent";

const ExportSalesByEventTable = ({ data }: { data: EventSales[] }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] bg-gray-900 text-white">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left text-white">
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Event
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Category
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Start date
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              End date
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Duration (days)
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Total sales
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Average sales (per day)
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Average sold books (per day)
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Total quantity
            </th>
            <th className="p-2 border border-gray-300 dark:border-gray-700">
              Unique books
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-700 dark:hover:bg-gray-600 text-white"
            >
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.event_name}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.category_name}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.start_date.split("00:00")[0]}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.end_date.split("00:00")[0]}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.duration}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.total_sales}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.average_sales_per_day}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.average_books_sold_per_day}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.total_quantity_sold}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700">
                {item.unique_books_sold}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportSalesByEventTable;
