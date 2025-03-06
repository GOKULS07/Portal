import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Hardcoded admin credentials (for demonstration purposes)
  const adminCredentials = {
    email: 'gokuls@gmail.com',
    password: 'admin123',
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        // Sign-up logic
        if (username !== adminCredentials.email) {
          setError('Only the admin email (gokuls@gmail.com) is allowed to sign up.');
          return;
        }
        // Simulate successful sign-up
        alert('Sign-up successful! You can now log in.');
        setIsSignUp(false); // Switch back to login mode
      } else {
        // Login logic
        if (username !== adminCredentials.email || password !== adminCredentials.password) {
          setError('Invalid username or password.');
          return;
        }
        // Simulate successful login
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>BANNARI AMMAN INSTITUTE OF TECHNOLOGY</h1>
        <h3>{isSignUp ? 'ADMIN SIGN UP' : 'ADMIN LOGIN'}</h3>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;