import { useEffect, useState, useMemo } from "react";
import { useGetAll, usePost } from "../../services/useApi";
import { Job } from "../../types/types";
import { CreateButton } from "../common/Button";
import SearchInput from "../common/Search";
import { useNavigate } from "react-router-dom";
import Table from "../common/Table";
import Tooltip from "../common/Tooltip";
import LoadingSpinner from "../common/LoadingSpinner";
import { debounce } from "lodash";

export default function JobsTable() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { data: jobs, error, isLoading } = useGetAll("/jobs");
  const { postData: addNewJob, isLoading: isAdding, error: addError } = usePost();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (jobs) setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearchInput = debounce((value: string) => {
    setSearchValue(value.trim().toLowerCase());
  }, 300);

  const filteredData = useMemo(() => {
    if (!searchValue) return filteredJobs;
    return filteredJobs.filter((job: Job) => job.name.toLowerCase().includes(searchValue));
  }, [filteredJobs, searchValue]);

  const addJob = async (newJob: Job) => {
    try {
      await addNewJob("/jobs", newJob);
      setFilteredJobs(prevJobs => [...prevJobs, newJob]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleRowClick = (jobId: string) => {
    navigateTo(`/${jobId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || addError) return <div>Error: {error || addError}</div>;

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
        className="w-[150px] h-[35px] rounded-md text-sm font-normal flex items-center justify-center text-white"
        style={{ backgroundColor: status.color }}
      >
        {status.label}
      </button>
    </div>
  );

  const dataWithRenderedStatus = filteredData.map((job: any) => ({
    ...job,
    status: renderStatusButton(job.status),
  }));

  return (
    <div className="my-4 shadow-lg rounded-lg overflow-hidden">
      <div className="w-full bg-white">
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
              <SearchInput onSearch={handleSearchInput} />
            </div>
            <CreateButton addJob={addJob} setFilteredJobs={setFilteredJobs} />
          </div>
        </div>

        <div className="w-full h-[600px] overflow-x-auto overflow-y-auto">
          <Table<Job>
            data={dataWithRenderedStatus}
            columns={columns}
            onRowClick={handleRowClick}
            textColor="text-[#1264A3]"
          />
        </div>
      </div>
    </div>
  );
}
