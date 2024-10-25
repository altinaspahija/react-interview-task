import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Jobs from "./pages/Jobs";
import JobsDetails from "./components/jobs/JobDetails";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Jobs />} />
      <Route path="/:id" element={<JobsDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
  );
}
