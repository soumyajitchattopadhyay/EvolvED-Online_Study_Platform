import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import "./styles/Settings.css";

const Settings = () => {
  // State for settings
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [sidebarPosition, setSidebarPosition] = useState("left");
  const [autoSave, setAutoSave] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedFontSize = localStorage.getItem("fontSize") || "16px";
    const savedSidebarPosition = localStorage.getItem("sidebarPosition") || "left";
    const savedAutoSave = localStorage.getItem("autoSave") === "true";

    setDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    setSidebarPosition(savedSidebarPosition);
    setAutoSave(savedAutoSave);

    // Apply settings globally
    document.body.classList.toggle("dark-mode", savedDarkMode);
    document.documentElement.style.fontSize = savedFontSize;

    // Apply sidebar position globally
    document.body.classList.remove("sidebar-left", "sidebar-right");
    document.body.classList.add(`sidebar-${savedSidebarPosition}`);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  // Change font size
  const changeFontSize = (size) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
    document.documentElement.style.fontSize = size;
  };

  // Toggle sidebar position globally
//   const toggleSidebarPosition = () => {
//     const newPosition = sidebarPosition === "left" ? "right" : "left";
//     setSidebarPosition(newPosition);
//     localStorage.setItem("sidebarPosition", newPosition);
  
//     // 🔥 Force Sidebar to detect changes instantly
//     window.dispatchEvent(new Event("storage"));
//   };
  
  

  // Toggle auto-save
  const toggleAutoSave = () => {
    const newAutoSave = !autoSave;
    setAutoSave(newAutoSave);
    localStorage.setItem("autoSave", newAutoSave);
  };

  return (
    <div className="settings-container">
      {/* Sidebar remains visible */}
      <Sidebar />
      
      <div className="settings-content">
        <h2>Settings</h2>
        
        <Card className="settings-card">
          <Card.Body>
            <Form>
              {/* Dark Mode Toggle */}
              <Form.Group>
                <Form.Label>Dark Mode</Form.Label>
                <Form.Check
                  type="switch"
                  id="dark-mode-toggle"
                  label={darkMode ? "Enabled" : "Disabled"}
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              </Form.Group>

              {/* Font Size Selection */}
              <Form.Group>
                <Form.Label>Font Size</Form.Label>
                <Form.Select
                  value={fontSize}
                  onChange={(e) => changeFontSize(e.target.value)}
                >
                  <option value="14px">Small</option>
                  <option value="16px">Default</option>
                  <option value="18px">Large</option>
                  <option value="20px">Extra Large</option>
                </Form.Select>
              </Form.Group>

              {/* Sidebar Position Toggle */}
              {/* <Form.Group>
                <Form.Label>Sidebar Position</Form.Label>
                <Button variant="info" onClick={toggleSidebarPosition}>
                  Move to {sidebarPosition === "left" ? "Right" : "Left"}
                </Button>
              </Form.Group> */}

              {/* Auto-Save Toggle */}
              <Form.Group>
                <Form.Label>Auto Save</Form.Label>
                <Form.Check
                  type="switch"
                  id="auto-save-toggle"
                  label={autoSave ? "On" : "Off"}
                  checked={autoSave}
                  onChange={toggleAutoSave}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
