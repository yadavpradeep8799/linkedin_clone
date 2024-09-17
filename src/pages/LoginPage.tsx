import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice'; // Import the action
import Logo from '../components/Logo';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState(''); // State for validation error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to validate phone number
  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Regex to match 10-digit phone number
    return phoneRegex.test(number);
  };

  // Handle phone number submission with validation
  const handlePhoneSubmit = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setError('');
      setShowOtp(true);
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = () => {
    if (otp === '1234') {
      dispatch(login({ phoneNumber })); // Dispatch the login action with phone number
      navigate('/feed');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Logo />
        <h2 className="login-header">Welcome Back</h2>
        {!showOtp ? (
          <>
            <p className="login-instructions">Enter your phone number to log in.</p>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="login-input"
            />
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <button onClick={handlePhoneSubmit} className="login-button">Send OTP</button>
          </>
        ) : (
          <>
            <p className="login-instructions">Enter the OTP sent to your phone.</p>
            <div className="otp-wrapper">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => <input {...props} className="otp-input" />}
              />
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display OTP error message */}
            <button onClick={handleOtpSubmit} className="login-button">Submit OTP</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
