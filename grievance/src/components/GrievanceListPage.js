import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GrievanceListPage.css';

const API_URL = 'http://localhost:5000/api/grievances'; // Backend URL

const GrievanceListPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch grievances from the backend
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(API_URL);

        // Ensure response data is an array
        const grievancesData = Array.isArray(response.data) ? response.data : [];

        // Sort grievances by date (newest first)
        const sortedGrievances = grievancesData.sort(
          (a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0)
        );

        setGrievances(sortedGrievances);
      } catch (err) {
        console.error('Error fetching grievances:', err);
        setError(err.response?.data?.message || 'Failed to load grievances.');
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  return (
    <div className="container">
      <h1>Grievance List</h1>

      {loading ? (
        <p>Loading grievances...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : grievances.length === 0 ? (
        <p>No grievances found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Issue Type</th>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Reject Reason</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance, index) => (
              <tr key={grievance._id || index}>
                <td>{index + 1}</td>
                <td>{new Date(grievance.date || grievance.createdAt || 0).toLocaleDateString()}</td>
                <td>{grievance.category || 'N/A'}</td>
                <td>{grievance.issueType || 'Unknown'}</td>
                <td>{grievance.title || 'No Title'}</td>
                <td>
                  {grievance.issueType === 'Non-Anonymous' ? grievance.name || 'N/A' : 'Anonymous'}
                </td>
                <td>
                  {grievance.issueType === 'Non-Anonymous' ? grievance.email || 'N/A' : '-'}
                </td>
                <td className={`status ${grievance.status ? grievance.status.toLowerCase() : 'unknown'}`}>
                  {grievance.status || 'Pending'}
                </td>
                <td>{grievance.rejectReason || '-'}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GrievanceListPage;
