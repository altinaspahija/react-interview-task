import { useGetAll, usePost } from "../../services/useApi";
import { Job } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { CreateButton } from "../common/Button";
import SearchInput from "../common/Search";
import { useEffect, useState } from "react";
import Table from "../common/Table";
import Tooltip from "../common/Tooltip";

export default function JobsTable() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { data: jobs, error, isLoading } = useGetAll("/jobs");
  const {
    postData: addNewJob,
    isLoading: isAdding,
    error: addError,
  } = usePost();

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
      const response = await addNewJob("/jobs", newJob);
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

  const columns = [
    { header: "", key: "" as keyof Job },
    { header: "", key: "" as keyof Job },
    { header: "", key: "" as keyof Job },
    { header: "Jobsite Name", key: "name" as keyof Job },
    { header: "Status", key: "status" as keyof Job },
    { header: "", key: "" as keyof Job },
    { header: "", key: "" as keyof Job },
    { header: "", key: "" as keyof Job },
  ];

  const renderStatusButton = (status: any) => (
    <div className="flex justify-center items-center h-full">
      <button
        className={`w-[150px] h-[35px] rounded-md text-sm font-normal flex items-center justify-center text-white`}
        style={{ backgroundColor: status.color }}
      >
        {status.label}
      </button>
    </div>
  );

  const dataWithRenderedStatus = filteredJobs.map((job: any) => ({
    ...job,
    status: renderStatusButton(job.status),
  }));

  return (
    <div className="my-4 shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-[600px] overflow-x-auto overflow-y-auto bg-white">
        <div className="bg-[#F8F8FA] text-[#323338] text-md font-semibold px-4 py-2">
          <p className="text-left">Jobs</p>
        </div>
        <div className="flex justify-between items-center px-4 py-2">

            <div className="flex items-center">
              <Tooltip text="Jobs list" />
              <p className="text-[#323338] font-normal text-sm">
                Informative piece of text that can be used regarding this modal.
              </p>
            </div>
          
          <div className="flex h-full justify-end align-middle">
            <div className="w-80 mr-2">
              <SearchInput onSearch={handleSearchJobs} />
            </div>
            <CreateButton addJob={addJob} setFilteredJobs={setFilteredJobs} />
          </div>
        </div>

          <Table<Job>
            data={dataWithRenderedStatus}
            columns={columns}
            onRowClick={handleRowClick}
            textColor="text-[#1264A3]"
          />
        </div>
      </div>
  
  );
}
