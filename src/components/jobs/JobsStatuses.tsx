import React from "react";
import { useGetAll } from "../../services/useApi";
import { Status } from "../../types/types";


export default function JobsStatuses() {
    const { data: statuses, error, isLoading } = useGetAll('/statuses'); 

  if (isLoading) {
    return <div>Loading statuses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex justify-between items-center space-x-2 bg-white p-2 shadow-lg rounded-lg">
      {statuses?.map((status:Status, index:number) => (
        <div
          key={index}
          className={`flex w-1/3 h-[100px] rounded-md text-3xl font-semibold items-center justify-center text-white`}
          style={{ backgroundColor: status.color }}
        >
          {status.label}
        </div>
      ))}
    </div>
  );
}
