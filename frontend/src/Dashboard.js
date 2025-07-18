import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { refreshToken, getAuthToken, removeAuthToken } from "./utils/auth";
import Sidebar from "./Sidebar";
import './styles/Dashboard.css';
import "./App.css";  
 
 
const Dashboard = () => {
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Student");
 
  useEffect(() => {
    fetchDiscussions();
 
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (parsedUser.name) {
          setUserName(parsedUser.name);
        }
      } catch (e) {
        console.error("Error parsing user info:", e);
      }
    }
  }, [navigate]);
 
  const fetchDiscussions = async () => {
    setLoading(true);
    try {
        let token = localStorage.getItem("accessToken");
 
        if (!token) {
            console.error("No access token! Redirecting to login...");
            setError("You are not logged in. Please login.");
            setTimeout(() => navigate("/login"), 2000);
            return;
        }
 
        console.log("Using Token:", token);
 
        const response = await fetch("http://127.0.0.1:8000/api/discussions/view/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
 
        if (response.status === 401) {
            console.warn("Unauthorized! Attempting token refresh...");
            token = await refreshToken();
            if (!token) {
                console.error("Token refresh failed. Logging out.");
                removeAuthToken();
                navigate("/login");
                return;
            }
            return fetchDiscussions();
        }
 
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }
 
        const data = await response.json();
        console.log("Discussions Fetched:", data);
 
        setDiscussions(data);
        setLoading(false);  
    } catch (err) {
        console.error("Error in fetchDiscussions:", err);
        setError("Failed to load discussions.");
        setLoading(false);  
    }
};
 
  const handleLogout = () => {
    removeAuthToken();
    navigate('/');
  };
 
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }
 
  return (
    <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <Button className="logout-btn" onClick={handleLogout}>Logout</Button>
            </div>

            <Container className="dashboard-content">
                <div className="welcome-section">
                    <h2>Welcome!</h2>
                    <p>Here's what's happening in your learning journey:</p>
                </div>

                {loading ? (
                    <p>Loading discussions...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : discussions.length > 0 ? (
                    <div className="discussion-list">
                        {discussions.map((discussion) => (
                            <div key={discussion.id} className="discussion-item">
                                <h5>{discussion.title}</h5>
                                <p>{discussion.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No discussions available.</p>
                )}
            </Container>
        </div>
    </div>
);
 
};
 
export default Dashboard;