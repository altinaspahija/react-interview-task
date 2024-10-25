import apiService from './apiService';

export const getJobCountsByStatus = async () => {
  try {
    const statuses = await apiService.getAll('/statuses');
    const jobs = await apiService.getAll('/jobs'); 
    const statusCounts: Record<string, number> = {};
    statuses.forEach((status: any) => {
      statusCounts[status.label] = 0;
    });
    jobs.forEach((job: any) => {
      const jobStatusLabel = job.status?.label;
      if (jobStatusLabel && statusCounts[jobStatusLabel] !== undefined) {
        statusCounts[jobStatusLabel] += 1; 
      }
    });
    return { statuses, statusCounts };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
