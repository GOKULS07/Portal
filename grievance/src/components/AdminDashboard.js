import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ManageGrievances from './ManageGrievances';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminEmail] = useState('admin@example.com');
  const [stats, setStats] = useState({ pending: 0, solved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(() => {
    fetch('http://localhost:5000/api/grievances/count')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch grievance counts');
        return res.json();
      })
      .then(data => {
        setStats(prevStats => {
          if (JSON.stringify(prevStats) !== JSON.stringify(data)) {
            return data;
          }
          return prevStats;
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching grievance counts:', err);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <nav className={styles.dashboardSidebar}>
        <ul>
          <li><Link to="/admin-dashboard">Dashboard</Link></li>
          <li><Link to="/admin-dashboard/manage-grievances">Manage Grievances</Link></li>
        </ul>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </nav>

      {/* Dashboard Content */}
      <div className={styles.dashboardContent}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Admin Dashboard</h1>
                <section className={styles.adminDetails}>
                <img src="college logo.jpg" alt="College Logo" className="college-logo" />
                  <div>
                    <h2 className={styles.adminName}>Admin Name</h2>
                    <p className={styles.adminInfo}><strong>Email:</strong> {adminEmail}</p>
                  </div>
                </section>

                {/* Statistics Section */}
                {loading ? (
                  <p>Loading grievance data...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <div className={styles.statsContainer}>
                    <div className={`${styles.statsCard} ${styles.pending}`}>
                      <h3>Pending</h3>
                      <p>{stats.pending}</p>
                    </div>
                    <div className={`${styles.statsCard} ${styles.solved}`}>
                      <h3>Solved</h3>
                      <p>{stats.solved}</p>
                    </div>
                    <div className={`${styles.statsCard} ${styles.rejected}`}>
                      <h3>Rejected</h3>
                      <p>{stats.rejected}</p>
                    </div>
                  </div>
                )}
                <p>Welcome to the Admin Dashboard. Use the sidebar to navigate between different sections.</p>
              </div>
            }
          />
          <Route path="manage-grievances" element={<ManageGrievances />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
