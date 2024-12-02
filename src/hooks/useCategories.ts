import { useEffect, useState } from "react";

interface Category {
  category_id: number;
  category_name: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/sales/categories"
      );

      if (!response.ok) {
        throw new Error("Categories could not be fetched");
      }

      const result = await response.json();
      setCategories(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, error };
};

export default useCategories;
