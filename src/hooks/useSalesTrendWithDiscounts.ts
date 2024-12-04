import { useState, useEffect } from "react";

export interface TrendData {
  date: string;
  trend_value: number;
}

export interface Filters {
  gender: string;
  ageMin: number;
  ageMax: number;
  startDate: string;
  endDate: string;
  frequency: "Daily" | "Monthly" | "Yearly";
  predictionPoints: number;
  trendType:
    | "linear"
    | "exponential"
    | "polynomial"
    | "logarithmic"
    | "power-law"
    | "moving_average";
}

const useSalesTrendWithDiscounts = (initialFilters: Filters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState<{
    trend: TrendData[];
    futureTrend: TrendData[];
  } | null>(null);

  const fetchSalesData = async () => {
    const queryString = new URLSearchParams(filters as any).toString();
    const url = `http://localhost:8000/api/sales/fetch-sales-trend?${queryString}`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error("Network response was not ok");

      const { trend_data } = await response.json();
      // Extract the trend data for the selected category

      if (trend_data) {
        setData(trend_data);
      } else {
        setData(null);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [filters]);

  return { data, filters, setFilters, fetchSalesData };
};

export default useSalesTrendWithDiscounts;
