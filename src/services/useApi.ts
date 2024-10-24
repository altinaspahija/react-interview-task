import { useEffect, useState } from 'react';
import apiService from '../api/apiService';

export function useGetAll(endpoint: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAll(endpoint);
        setData(response);
        setError(null);
      } catch (err: any) {
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); 
  }, [endpoint]);

  return { data, error, isLoading };
}