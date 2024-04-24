import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import your login/dashboard components here
import LoginPage from './components/LoginPage';
import DashboardPage from './components/Dashboard'; // Make sure to import your DashboardPage component
import DashTemp from './dashcomps/DashTemp';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const checkLoginStatus = async () => {
    try {
      // Check if the user has a login token stored in local storage
      const token = localStorage.getItem('loginToken');
      setLoading(false);
    } catch (error) {
      console.error('Error checking login status:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashTemp />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
