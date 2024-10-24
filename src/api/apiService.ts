import axiosClient from './axiosClient';

const apiService = {
  getAll: async <T>(url: string): Promise<T[]> => {
    const response = await axiosClient.get(url);
    return response.data;
  },

  getById: async <T>(url: string, id: string): Promise<T> => {
    const response = await axiosClient.get(`${url}/${id}`);
    return response.data;
  },

  post: async <T>(url: string, data: T): Promise<T> => {
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  put: async <T>(url: string, id: string, data: T): Promise<T> => {
    const response = await axiosClient.put(`${url}/${id}`, data);
    return response.data;
  },

  delete: async (url: string, id: string): Promise<void> => {
    await axiosClient.delete(`${url}/${id}`);
  },
};

export default apiService;
