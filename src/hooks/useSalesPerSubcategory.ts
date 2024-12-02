import { useState, useEffect } from "react";

export interface FetchSalesSubcategoryData {
  subcategory_name: string;
  total_sales: number;
}

interface Filters {
  category: string;
  gender: string;
  ageMin: number;
  ageMax: number;
  startDate: string;
  endDate: string;
}

const useSalesPerSubcategory = (initialFilters: Filters) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [data, setData] = useState<FetchSalesSubcategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesPerSubcategoryData = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value != null)
        )
      ).toString();
      const url = `http://localhost:8000/api/sales/subcategory-series?${queryString}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }

      const fetchedData: FetchSalesSubcategoryData[] = await response.json();
      if (!Array.isArray(fetchedData)) {
        throw new Error("Unexpected response format");
      }

      console.log(fetchedData);

      setData(fetchedData);
    } catch (err: any) {
      console.error("Error fetching sales per subcategory data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesPerSubcategoryData();
  }, [filters]);

  return {
    data,
    loading,
    error,
    filters,
    setFilters,
    fetchSalesPerSubcategoryData,
  };
};

export default useSalesPerSubcategory;
