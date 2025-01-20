import { useState } from "react";

interface UseApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  params?: Record<string, any>; // Query parameters for GET requests
  body?: any; // Body for POST, PUT, etc.
  path?: string; // Path params to be appended to the endpoint
}

export const useApiRequest = <TData = any>(
  endpoint: string,
  defaultOptions: UseApiRequestOptions = {}
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    message: string;
    statusCode?: number;
  } | null>(null);

  const executeRequest = async (overrideOptions: UseApiRequestOptions = {}) => {
    setLoading(true);
    setError(null);

    const {
      method = "GET",
      headers = {},
      params,
      body,
      path = "", // Path params default to empty string
    } = {
      ...defaultOptions,
      ...overrideOptions,
    };

    // Build query parameters for GET requests
    const queryParams = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";

    // Combine base endpoint with path params and query params
    const url = `${endpoint}${path}${queryParams}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Error ${response.status}: ${errorMessage || response.statusText}`
        );
      }

      const responseData: TData = await response.json();
      setData(responseData);
      return { data: responseData };
    } catch (err: any) {
      console.error("API request error:", err);
      setError({
        message: err.message,
        statusCode: err.statusCode || 500,
      });
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    executeRequest,
    resetState,
  };
};
