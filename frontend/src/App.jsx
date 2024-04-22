import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import your login/dashboard components here
import LoginPage from './components/LoginPage';
import DashboardPage from './components/Dashboard'; // Make sure to import your DashboardPage component

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Check if the user has a login token stored in cookies
      const token = getCookie('loginToken');
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes for other pages */}
        <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
