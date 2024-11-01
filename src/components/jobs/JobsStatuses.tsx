import { useJobCountsByStatus } from "../../services/useApi";
import LoadingSpinner from "../common/LoadingSpinner";

export default function JobsStatuses() {
  const { statuses, statusCounts, isLoading, error } = useJobCountsByStatus();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between items-center space-x-2 bg-white p-2 shadow-lg rounded-lg">
      {statuses.map((status: any, index: number) => {

        return (
          <div
            key={index}
            className="flex w-1/3 h-[100px] rounded-lg text-3xl font-semibold items-center justify-center text-white"
            style={{ backgroundColor: status.color }}  
          >
            {statusCounts[status.label]} {status.label}
          </div>
        );
      })}
    </div>
  );
}
