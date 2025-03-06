import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import GrievanceListPage from './GrievanceListPage';
import GrievanceFormPage from './GrievanceFormPage';
import styles from './FacultyDashboard.module.css';

const FacultyDashboard = () => {
  const [user, setUser] = useState({
    displayName: 'Faculty Name', // Hardcoded for demonstration
    email: 'faculty@example.com', // Hardcoded for demonstration
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('userToken'); // Clear any stored token
    navigate('/faculty-login'); // Redirect to login page
  };

  if (!user) {
    return null; // Render nothing if the user is not authenticated
  }

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <ul className={styles.navList}>
          <li>
            <Link to="/faculty-dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/faculty-dashboard/view-grievances" className={styles.navLink}>
              View My Grievances
            </Link>
          </li>
          <li>
            <Link to="/faculty-dashboard/submit-grievance" className={styles.navLink}>
              Grievance Form
            </Link>
          </li>
        </ul>
        <div className={styles.logout}>
          <Link to="/" onClick={handleLogout} className={styles.navLink}>
            Logout
          </Link>
        </div>
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className={styles.dashboardTitle}>Faculty Dashboard</h1>
                <section className={styles.facultyDetails}>
                   <img src="college logo.jpg" alt="College Logo" className="college-logo" />
                  <div className={styles.details}>
                    <h2 className={styles.facultyName}>{user.displayName}</h2>
                    <p className={styles.facultyInfo}>
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                </section>
                <p className={styles.welcomeMessage}>
                  Welcome to the Faculty Dashboard. Use the sidebar to navigate between
                  different sections.
                </p>
                <p className={styles.welcomeMessage}>
                  Here you can submit and view grievances.
                </p>
              </div>
            }
          />
          <Route path="view-grievances" element={<GrievanceListPage />} />
          <Route path="submit-grievance" element={<GrievanceFormPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default FacultyDashboard;