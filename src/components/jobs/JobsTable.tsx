import { useGetAll, usePost } from "../../services/useApi";
import { AiFillInfoCircle } from "react-icons/ai";
import { Job } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { CreateButton } from "../common/Button";
import SearchInput from "../common/Search";
import { useEffect, useState } from "react";

export default function JobsTable() {
  const { data: jobs, error, isLoading } = useGetAll("/jobs");
  const { postData: addNewJob, isLoading: isAdding, error: addError } = usePost();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (jobs && !searchValue) {
      setFilteredJobs(jobs);
    }
  }, [jobs, searchValue]);

  const handleSearchJobs = (value: string) => {
    setSearchValue(value);
    if (searchValue.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job: Job) =>
        job.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const addJob = async (newJob: Job) => {
    try {
      const response = await addNewJob('/jobs', newJob); 
      setFilteredJobs((prevJobs) => [...prevJobs, response]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const navigateTo = useNavigate();
  const handleRowClick = (jobId: string) => {
    navigateTo(`/${jobId}`);
  };

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
              <th className="text-left py-2 px-4">Jobs List</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="w-full">
              <td className="flex flex-row items-center justify-start text-sm font-normal p-4 relative">
                <div className="relative group">
                  <AiFillInfoCircle
                    className="w-[20px] h-[20px] inline-block mr-2"
                    color="#1264A3"
                  />

                  <div className="absolute bottom-full mb-2 ml-10 w-16 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300">
                    Jobs List
                  </div>
                </div>
                <p className="text-[#323338] font-normal text-sm">
                  Informative piece of text that can be used regarding this
                  modal.
                </p>
              </td>
              <td className="text-right py-4">
                <div className="flex h-full justify-end">
                  <SearchInput onSearch={handleSearchJobs} />
               <CreateButton addJob={addJob} setFilteredJobs={setFilteredJobs}/>
                </div>
              </td>
            </tr>
            <tr>
              <th className="w-1/4 font-semibold text-center text-md text-[#323338]">
                Jobsite Name
              </th>
              <th className="w-1/4 font-semibold text-center text-md text-[#323338]">
                Status
              </th>
            </tr>

            {filteredJobs?.map((job: Job, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 !== 0 ? "bg-white" : "bg-[#F8F8FA]"
                } hover:cursor-pointer`}
                onClick={() => handleRowClick(job.id)}
              >
                <td className="w-1/4 font-semibold text-center text-md text-[#1264A3]">
                  {job.name}
                </td>
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
