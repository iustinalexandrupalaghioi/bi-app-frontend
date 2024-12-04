import { useState, useEffect } from "react";

export interface FetchSalesByEventData {
  data: EventSales[];
}

export interface EventSales {
  event_name: string;
  category_name: string;
  friendly_name: string;
  start_date: string;
  end_date: string;
  duration: number;
  total_sales: number;
  total_quantity_sold: number;
  unique_books_sold: number;
  average_sales_per_day: number;
  average_books_sold_per_day: number;
}

interface Filters {
  category: number;
  startDate: string;
  endDate: string;
}

const useSalesByEvent = (initialFilters: Filters) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [data, setData] = useState<EventSales[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesByEvent = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value != null)
        )
      ).toString();
      const url = `http://localhost:8000/api/sales/fetch-event-sales?${queryString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }

      const { data } = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }

      setData(data);
    } catch (err: any) {
      console.error("Error fetching sales per subcategory data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesByEvent();
  }, [filters]);

  return {
    data,
    loading,
    error,
    filters,
    setFilters,
    fetchSalesByEvent,
  };
};

export default useSalesByEvent;
