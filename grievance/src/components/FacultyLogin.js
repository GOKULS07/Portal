import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyLogin.css';

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Hardcoded faculty credentials (for demo purposes)
  const facultyCredentials = {
    email: 'faculty@example.com',
    password: 'faculty123',
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Simulate Sign-Up (Demo)
        if (username !== facultyCredentials.email) {
          setError('Only faculty@example.com is allowed to sign up.');
          return;
        }
        alert('Sign-up successful! You can now log in.');
        setIsSignUp(false);
      } else {
        // Login logic
        if (username !== facultyCredentials.email || password !== facultyCredentials.password) {
          setError('Invalid username or password.');
          return;
        }

        // Store user details in localStorage
        const user = { name: "Faculty Member", email: username };
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to faculty dashboard
        navigate('/faculty-dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>BANNARI AMMAN INSTITUTE OF TECHNOLOGY</h1>
        <h2>{isSignUp ? 'FACULTY SIGN UP' : 'FACULTY LOGIN'}</h2>
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

export default FacultyLogin;
