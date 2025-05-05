import { useCallback, useEffect, useState } from "react"
interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: unknown;
}

interface ApiResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useApi = <T,>(url: string, options: ApiOptions = {}): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const defaultHeadersOptions = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer MYTOKEN',
            };

            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: { ...defaultHeadersOptions, ...options.headers },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonResponse = await response.json();
            setData(jsonResponse);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    }, [url, options.method, options.headers, options.body]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}