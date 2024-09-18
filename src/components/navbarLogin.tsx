import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar
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
        <div className="navbar-logo d-flex justify-content-start">
          <Link to="/">LinkedIn</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
