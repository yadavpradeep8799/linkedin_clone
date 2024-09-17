import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar
import profilePic from '../assets/pp.jpg';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice'; // Import the logout action

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">LinkedIn</Link>
        </div>
        <div className="navbar-search searCh" >
          <input type="text" placeholder="Search" />
        </div>
        <div className="navbar-links">
          <Link to="/feed">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/notifications">Notifications</Link>
        </div>
        <div className="navbar-user">
          <img
            src={profilePic}
            alt="Profile"
            className="navbar-profile-pic"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
          />
          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
