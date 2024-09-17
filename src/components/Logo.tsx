import React from 'react';
import logo from '../assets/logo.png'; // Ensure the logo path is correct

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="App Logo" className="app-logo" />
    </div>
  );
};

export default Logo;
