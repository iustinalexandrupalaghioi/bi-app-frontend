import { useState, useEffect } from "react";

export interface SalesCityData {
  latitude: number;
  longitude: number;
  total_sales: number;
  transaction_count: number;
  average_sale: number;
  min_sale: number | null;
  max_sale: number | null;
  gender_breakdown: Record<string, number>; // Gender percentages
  age_group_distribution: Record<string, number>; // Age group percentages
}

interface Filters {
  startDate: string;
  endDate: string;
}

const useSalesMapPoints = (initialFilters: Filters) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [data, setData] = useState<Record<string, SalesCityData>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesByCity = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value != null)
        )
      ).toString();
      const url = `http://localhost:8000/api/sales/cities?${queryString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }

      const fetchedData = await response.json();

      if (typeof fetchedData !== "object" || Array.isArray(fetchedData)) {
        throw new Error("Unexpected response format");
      }

      setData(fetchedData);
    } catch (err: any) {
      console.error("Error fetching sales by city data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesByCity();
  }, [filters]);

  return {
    data,
    loading,
    error,
    filters,
    setFilters,
    fetchSalesByCity,
  };
};

export default useSalesMapPoints;
