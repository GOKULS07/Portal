import React from 'react';

const Settings = () => {
  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
 
    window.location.href = '/'; 
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>Adjust the dashboard settings and manage your preferences here.</p>
      <div className="settings-form">
        <h3>Notification Preferences</h3>
        <label>
          <input type="checkbox" /> Enable email notifications
        </label>
        <label>
          <input type="checkbox" /> Enable SMS notifications
        </label>
        <button className="btn">Save Changes</button>
      </div>
      <div className="settings-form">
        <h3>Account Settings</h3>
        <label>
          <span>Change Password:</span>
          <input type="password" placeholder="New password" />
        </label>
        <button className="btn">Update Password</button>
      </div>
      <div className="logout">
        <button className="btn" onClick={handleLogout}>Logout</button> {/* Added Logout Button */}
      </div>
    </div>
  );
};

export default Settings;
