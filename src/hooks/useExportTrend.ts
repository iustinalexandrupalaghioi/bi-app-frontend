import { useState, useEffect } from "react";

export interface FetchSalesData {
  sale_id: number;
  book_title: string;
  age_group: string;
  age_group_description: string;
  gender: string;
  sale_date: string;
  quantity: number;
  total_sales: number;
  category: string;
}

interface Filters {
  gender: string;
  ageMin: number;
  ageMax: number;
  startDate: string;
  endDate: string;
  frequency: string;
  trendType: string;
  predictionYears: number;
}

const useFetchSales = (initialFilters: Filters) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [data, setData] = useState<FetchSalesData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSalesData = async () => {
    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:8000/api/sales/fetch-sales?${queryString}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const fetchedData = await response.json();
      setData(fetchedData.data || []);
    } catch (error: any) {
      console.error("Error fetching sales data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [filters]);

  return { data, filters, setFilters, fetchSalesData, loading, error };
};

export default useFetchSales;
