import { useState, useEffect } from "react";

export interface FetchSalesSubcategoryData {
  subcategory_name: string;
  totalsales: number;
}

interface Filters {
  category?: string | undefined;
  gender?: string;
  ageMin?: number;
  ageMax?: number;
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

    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:8000/api/sales/subcategory-series?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }

      const fetchedData: FetchSalesSubcategoryData[] = await response.json();
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
