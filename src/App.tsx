// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import MessagePage from './pages/MessagePage';
import NotificationPage from './pages/NotificationPage';

function App() {
  // Access the authentication state from Redux
  const isAuthenticated = useSelector((state: RootState) => state.user.phoneNumber !== null);

  return (
    <Router>
      {/* Conditionally render Navbar based on authentication state */}
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={isAuthenticated ? <FeedPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <MessagePage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />
        {/* Default route to redirect to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
