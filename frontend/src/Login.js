import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./utils/auth";
import "./styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",  
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    console.log("Submitting login request...", formData);
  
    try {
      const response = await loginUser(formData);
      console.log("Login response:", response); 
  
      if (response.access || response.access_token) {  
        const token = response.access || response.access_token; 
        localStorage.setItem("token", token);
        console.log("Stored Token:", token);  
  
        // Check if token is actually set
        const storedToken = localStorage.getItem("token");
        console.log("Retrieved Token:", storedToken);
  
        if (storedToken) {
          console.log("Navigating to dashboard...");
          navigate("/dashboard");  
        } else {
          console.error("Token not found in localStorage.");
          setError("Login failed. Token storage issue.");
        }
      } else {
        console.error("Token not received from backend.");
        setError("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };
  
  

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-4">
        <Card.Body>
          <h2 className="text-center">Welcome Back!</h2>
          <p className="text-center">Sign in to continue to EvolvED</p>

          {error && <p className="text-danger">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>  
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
