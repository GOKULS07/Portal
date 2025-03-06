import React, { useState } from 'react';
import axios from 'axios';

const GrievanceFormPage = () => {
  const [issueType, setIssueType] = useState('Non-Anonymous');
  const [category, setCategory] = useState('Academics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState(null); // For custom alert
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'

  // Simulating facultyId (Replace this with actual authentication logic)
  const facultyId = "FAC123"; // You can get this from localStorage or auth context

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare grievance data
    const grievanceData = {
      facultyId,  
      issueType,
      category,
      title: title.trim(),
      description: description.trim(),
      status: 'Pending',
      date: new Date().toISOString(),
      name: issueType === 'Non-Anonymous' ? name.trim() : undefined,
      email: issueType === 'Non-Anonymous' ? email.trim() : undefined,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/grievances', grievanceData);
      console.log('Grievance submitted:', response.data);
      
      // Show success alert
      setAlertMessage('Grievance submitted successfully!');
      setAlertType('success');

      // Clear form fields
      setTitle('');
      setDescription('');
      setName('');
      setEmail('');

    } catch (error) {
      console.error('Error submitting grievance:', error.response?.data || error.message);
      
      // Show error alert
      setAlertMessage(error.response?.data?.error || 'Failed to submit grievance. Please try again.');
      setAlertType('error');
    }

    // Hide alert after 3 seconds
    setTimeout(() => setAlertMessage(null), 3000);
  };

  return (
    <div style={styles.container}>
      {alertMessage && (
        <div style={{ ...styles.alert, ...(alertType === 'success' ? styles.successAlert : styles.errorAlert) }}>
          {alertMessage}
        </div>
      )}

      <h1 style={styles.title}>Submit a Grievance</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="issueType" style={styles.label}>Issue Type</label>
          <select id="issueType" value={issueType} onChange={(e) => setIssueType(e.target.value)} required style={styles.input}>
            <option value="Non-Anonymous">Non-Anonymous</option>
            <option value="Anonymous">Anonymous</option>
          </select>
        </div>

        {issueType === 'Non-Anonymous' && (
          <>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            </div>
          </>
        )}

        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.input}>
            <option value="Academics">Academics</option>
            <option value="Mess">Mess</option>
            <option value="Special Lab">Special Lab</option>
            <option value="Transport">Transport</option>
            <option value="Skill/Reward Points">Skill/Reward Points</option>
            <option value="TAC">TAC</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.textarea} />
        </div>

        <button type="submit" style={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '700px',
    margin: '10px auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', Arial, sans-serif",
    border: '2px solid #007bff',
    position: 'relative',
  },
  alert: {
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '15px 20px',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    width: '80%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.5s ease-in-out, top 0.5s ease-in-out',
  },
  successAlert: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  errorAlert: {
    backgroundColor: '#dc3545',
    color: 'white',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '25px',
    fontWeight: '600',
    color: '#007bff',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.1rem',
    marginBottom: '8px',
    color: '#495057',
    fontWeight: '500',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ced4da',
    borderRadius: '6px',
    backgroundColor: '#f0f8ff',
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ced4da',
    borderRadius: '6px',
    backgroundColor: '#f0f8ff',
    resize: 'vertical',
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease-in-out, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
  },
};

export default GrievanceFormPage;
