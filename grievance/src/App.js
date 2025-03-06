import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import FacultyLogin from './components/FacultyLogin';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import GrievanceListPage from './components/GrievanceListPage';
import GrievanceFormPage from './components/GrievanceFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />

        <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
          
        </Route>

        <Route path="/faculty-dashboard/*" element={<FacultyDashboard />}>
          <Route path="view-grievances" element={<GrievanceListPage />} />
          <Route path="submit-grievance" element={<GrievanceFormPage />} />
        </Route>

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
