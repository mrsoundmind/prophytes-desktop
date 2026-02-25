"use client";
import { useState, useEffect, useRef } from "react";
import eventEmitter from "../utils/eventEmitter";

const useFetch = (url, options = {}, autoFetch = true, watchKeys = []) => {
  const [loading, setLoading] = useState(autoFetch);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refetchKey, setRefetchKey] = useState(0);
  const fetchDataRef = useRef();

  fetchDataRef.current = async (overrideOptions = {}) => {
    if (!url) {
      setLoading(false);
      setError(null);
      setData(null);
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const headers = {
        ...(options.headers || {}),
        ...(overrideOptions.headers || {}),
      };

      if (
        overrideOptions.body instanceof FormData ||
        options.body instanceof FormData
      ) {
        delete headers["Content-Type"];
      } else {
        headers["Content-Type"] = "application/json";
      }

      localStorage.getItem("token") &&
        (headers.Authorization = `Bearer ${localStorage.getItem("token")}`);

      const response = await fetch(url, {
        ...options,
        ...overrideOptions,
        headers,
        credentials: "include",
      });

      const result = await response.json();

      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && url) {
      fetchDataRef.current();
    }
  }, [url, refetchKey, autoFetch]);

  useEffect(() => {
    const handleKeyUpdate = (updatedKey) => {
      if (watchKeys.includes(updatedKey)) {
        setRefetchKey((prev) => prev + 1);
      }
    };

    // Store cleanup functions for each listener
    const cleanupFns = watchKeys.map((key) =>
      eventEmitter.on(`update:${key}`, handleKeyUpdate)
    );

    // Cleanup specific listeners on unmount
    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, [watchKeys]);

  const fetchData = (overrideOptions = {}) => {
    return fetchDataRef.current(overrideOptions);
  };

  const refetch = () => {
    setRefetchKey((prev) => prev + 1);
  };

  return { loading, data, error, fetchData, refetch };
};

export default useFetch;