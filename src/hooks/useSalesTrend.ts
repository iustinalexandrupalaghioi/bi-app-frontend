import { useState, useEffect } from "react";

export interface FetchSaleCategoryData {
  sale_date: string;
  totalSales: string;
}

interface Filters {
  gender: string;
  ageMin: number;
  ageMax: number;
  startDate: string;
  endDate: string;
  frequency: string;
}

const useSalesTrend = (initialFilters: Filters, endpoint: string) => {
  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState<FetchSaleCategoryData[]>([]);

  const fetchSalesData = async () => {
    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:5000/api/sales/${endpoint}?${queryString}`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Network response was not ok");

      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [filters]);

  return { data, filters, setFilters, fetchSalesData };
};

export default useSalesTrend;
