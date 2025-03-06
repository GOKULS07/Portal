import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/grievances"; // Backend URL

const ManageGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [viewDescription, setViewDescription] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(API_URL);
      setGrievances(response.data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const updateGrievanceStatus = async (id, newStatus, reason = "") => {
    if (newStatus === "Rejected" && !reason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus, reason });
      fetchGrievances();
      setShowRejectModal(null);
      setRejectReason("");
    } catch (error) {
      console.error("Error updating grievance:", error);
    }
  };

  const deleteGrievance = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this grievance?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchGrievances();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting grievance:", error);
    }
  };

  const toggleDescription = (id) => {
    setViewDescription(viewDescription === id ? null : id);
  };

  const categorizedGrievances = grievances.reduce((acc, grievance) => {
    acc[grievance.category] = acc[grievance.category] || [];
    acc[grievance.category].push(grievance);
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Grievances</h2>

      {showAlert && <div style={styles.alert}>Grievance deleted successfully!</div>}

      {Object.keys(categorizedGrievances).map((category) => (
        <div key={category} style={{ marginBottom: "30px" }}>
          <h4 style={styles.categoryTitle}>{category}</h4>
          <ul style={styles.list}>
            {categorizedGrievances[category].map((grievance) => (
              <li key={grievance._id} style={styles.listItem}>
                <div>
                  <strong>ID:</strong> {grievance._id} | <strong>Title:</strong> {grievance.title} |{" "}
                  <strong>Status:</strong>{" "}
                  <span style={styles.status(grievance.status)}>
                    {grievance.status}
                  </span>
                </div>

                {grievance.issueType === "Non-Anonymous" && (
                  <div style={styles.userDetails}>
                    <strong>Name:</strong> {grievance.name} | <strong>Email:</strong> {grievance.email}
                  </div>
                )}

                <button onClick={() => toggleDescription(grievance._id)} style={styles.button("blue")}>
                  {viewDescription === grievance._id ? "Hide" : "Read"}
                </button>

                {viewDescription === grievance._id && (
                  <p style={styles.description}>
                    <strong>Description:</strong> {grievance.description}
                  </p>
                )}

                {grievance.status === "Pending" && (
                  <div style={styles.buttonGroup}>
                    <button onClick={() => updateGrievanceStatus(grievance._id, "Solved")} style={styles.button("green")}>
                      Solve
                    </button>
                    <button onClick={() => setShowRejectModal(grievance._id)} style={styles.button("red")}>
                      Reject
                    </button>
                  </div>
                )}

                <button onClick={() => deleteGrievance(grievance._id)} style={styles.button("darkred")}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {showRejectModal && (
        <div style={styles.modal} onClick={() => setShowRejectModal(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h4>Enter reason for rejection:</h4>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              style={styles.textarea}
              placeholder="Enter reason..."
            />
            <div style={styles.buttonGroup}>
              <button onClick={() => updateGrievanceStatus(showRejectModal, "Rejected", rejectReason)} style={styles.button("red")}>
                Submit
              </button>
              <button onClick={() => setShowRejectModal(null)} style={styles.button("gray")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Styles
const styles = {
  container: {
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "40px auto",
    border: "1px solid #ddd",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "600",
    color: "#333",
  },
  categoryTitle: {
    fontSize: "1.4rem",
    color: "#0056b3",
    marginBottom: "15px",
    fontWeight: "600",
  },
  list: {
    listStyleType: "none",
    paddingLeft: "0",
    marginBottom: "0",
  },
  listItem: {
    padding: "18px",
    marginBottom: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.08)",
    border: "1px solid #ddd",
  },
  userDetails: {
    marginTop: "8px",
    fontSize: "1rem",
    color: "#555",
    fontWeight: "500",
  },
  description: {
    marginTop: "12px",
    padding: "10px",
    backgroundColor: "#f3f3f3",
    borderRadius: "6px",
  },
  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "15px", // Increased gap for better spacing
    flexWrap: "wrap", // Wrap buttons to next line if needed
  },
  button: (color) => ({
    padding: "10px 16px",
    backgroundColor: color,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "0.3s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    marginRight: "12px", // Space between buttons horizontally
    marginBottom: "10px", // Space between buttons vertically
    "&:last-child": {
        marginRight: "0", // Remove margin for the last button in a row
    },
    "&:hover": {
        opacity: "0.85",
    },
}),

  status: (status) => ({
    fontWeight: "bold",
    color:
      status === "Pending" ? "#d98c00" :
      status === "Solved" ? "#198754" :
      status === "Rejected" ? "#dc3545" :
      "#333",
  }),
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  
  
};



export default ManageGrievances;
