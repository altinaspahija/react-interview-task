import { useGetAll } from "../../services/useApi";
import { AiFillInfoCircle } from "react-icons/ai";
import { Job } from "../../types/types";

export default function JobsTable() {
  const { data: jobs, error, isLoading } = useGetAll('/jobs'); 

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-4 shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-[800px] overflow-x-auto overflow-y-auto bg-white ">
        <table className="w-full font-semibold">
          <thead className="bg-[#F8F8FA] text-[#323338] text-md font-semibold">
            <tr>
              <th className="text-left py-2 px-4">Jobs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="w-full">
              <td className="flex flex-row items-center justify-start text-sm font-normal p-4">
                <AiFillInfoCircle
                  className="w-[20px] h-[20px] inline-block mr-2"
                  color="#1264A3"
                />
                <p className="text-[#323338] font-normal text-sm">Jobs List</p>
              </td>
            </tr>
            <tr>
              <th className="w-1/4 font-semibold text-center text-md text-[#323338]">Jobsite Name</th>
              <th className="w-1/4 font-semibold text-center text-md text-[#323338]">Status</th>
            </tr>

     
            {jobs?.map((job:Job, index:number) => (
              <tr
                key={index}
                className={`${index % 2 !== 0 ? "bg-white" : "bg-[#F8F8FA]"} hover:cursor-pointer`}
              >
                <td className="w-1/4 font-semibold text-center text-md text-[#1264A3]">{job.name}</td>
                <td className="w-1/4">
                  <div className="flex justify-center items-center h-full">
                    <button
                      className={`w-[150px] h-[30px] rounded-md  text-md font-normal flex items-center justify-center text-white`}
                      style={{ backgroundColor: job.status.color }}
                  >
                      {job.status.label}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  );
}
