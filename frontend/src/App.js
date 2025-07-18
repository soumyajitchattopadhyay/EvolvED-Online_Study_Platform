import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Groups from './Groups';
import Discussion from './Discussions';
import Meetings from './Meetings';
import Settings from './Settings';
import { isAuthenticated } from './utils/auth';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  console.log("ProtectedRoute: Is Authenticated?", isAuth);

  if (!isAuth) {
    console.log("User not authenticated! Redirecting...");
    return <Navigate to="/login" replace />;
  }

  console.log("User authenticated! Showing page...");
  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/groups" element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        } />
        <Route path="/discussions" element={
          <ProtectedRoute>
            <Discussion /> 
          </ProtectedRoute>
        } />
        <Route path="/meetings" element={
          <ProtectedRoute>
            <Meetings /> 
          </ProtectedRoute>
        } />
       
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;