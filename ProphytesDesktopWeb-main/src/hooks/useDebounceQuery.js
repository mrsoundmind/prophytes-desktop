"use client";
import { useState, useEffect } from "react";

export default function useDebouncedQuery(initialFilters = {}, delay = 300) {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, delay);

    return () => clearTimeout(handler);
  }, [filters, delay]);

  return {
    filters,
    debouncedFilters,
    setFilter: (key, value) =>
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      })),
    clearFilters: () => setFilters(initialFilters),
  };
}
