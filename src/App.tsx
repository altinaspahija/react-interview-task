import JobsStatuses from "./components/jobs/JobsStatuses";
import JobsTable from "./components/jobs/JobsTable";

export default function App() {
  return (
    <div className='m-2 bg-[#F4F5F6]'>
      <JobsStatuses />
      <JobsTable />
  </div>
  );
}