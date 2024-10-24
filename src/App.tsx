import React, { useEffect, useState } from 'react';
import { Job } from './types/types';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map((job:Job) => (
          <li key={job.id}>
            {job.name} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;