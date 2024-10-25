import { useEffect, useState } from 'react';
import apiService from '../api/apiService';
import { getJobCountsByStatus } from '../api/jobsService';

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

export function useGetById(endpoint: string, id: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getById(endpoint, id);
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
  }, [endpoint, id]);

  return { data, error, isLoading };
}

export function usePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const postData = async (endpoint: string, payload: any) => {
    setIsLoading(true);
    try {
      const response = await apiService.post(endpoint, payload);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, error, isLoading };
}

export function usePut() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const putData = async (endpoint: string, id: string, payload: any) => {
    setIsLoading(true);
    try {
      const response = await apiService.put(endpoint, id, payload);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { putData, error, isLoading };
}

export function useJobCountsByStatus() {
  const [statuses, setStatuses] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const { statuses, statusCounts } = await getJobCountsByStatus();
        setStatuses(statuses);
        setStatusCounts(statusCounts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobCounts();
  }, []);

  return { statuses, statusCounts, isLoading, error };
}
