import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import "./styles/Groups.css";
import "./App.css";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUsers, faSearch, faPlus, faList } from "@fortawesome/free-solid-svg-icons";

const Groups = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [groups, setGroups] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            console.log("Fetching groups from API...");
            const response = await fetch("http://127.0.0.1:8000/api/groups/view/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched Groups:", data);
            setGroups(data);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };


    const handleCreateGroup = async () => {
        if (!groupName || !groupDescription) {
            console.error("Group name and description are required.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No authentication token found! Redirecting to login.");
            navigate("/login");
            return;
        }

        console.log("Creating group with token:", `Bearer ${token}`);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/groups/create/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: groupName,
                    description: groupDescription
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            console.log("Group created successfully:", data);

            setShowCreateModal(false);
            setGroupName("");
            setGroupDescription("");
            fetchGroups();
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    const handleJoinGroup = async (groupId, groupName) => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No authentication token found!");
            return;
        }

        console.log(`Joining group ID: ${groupId}`);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/groups/join/${groupId}/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${await response.text()}`);
            }
            const data = await response.json();
            setSuccessMessage(`You have successfully joined "${groupName}"!`);
            setShowSuccessModal(true);

            console.log("Successfully joined the group!");
            fetchGroups();
        } catch (error) {
            console.error("Error joining group:", error);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <div className="groups-container">
            <Sidebar />

            <div className="top-navbar">
                <div className="brand">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>EvolvED</span>
                </div>
                <div className="logout-container">
                    <Button className="logout-btn" onClick={handleLogout}>Logout</Button>
                </div>
            </div>

            <div className="main-content">
                <div className="group-image">
                    <FontAwesomeIcon icon={faUsers} size="5x" />
                </div>
                <h2>Study Groups</h2>
                <p>Create or join study groups to collaborate with other students.</p>
                <p className="group-count">📌 Total Groups Available: {groups.length}</p>

                
                {groups.length > 0 && (
                    <div className="featured-group">
                        <h4>🔥 Latest Group: {groups[groups.length - 1].name}</h4>
                        <p>{groups[groups.length - 1].description}</p>
                    </div>
                )}

                <div className="group-actions">
                    <div className="group-card">
                        <h5><FontAwesomeIcon icon={faPlus} /> Create a Group</h5>
                        <p>Start a new study group</p>
                        <Button onClick={() => setShowCreateModal(true)}>
                            <FontAwesomeIcon icon={faPlus} /> Create
                        </Button>
                    </div>

                    <div className="group-card">
                        <h5><FontAwesomeIcon icon={faSearch} /> View Groups</h5>
                        <p>Search and join existing study groups</p>
                        <Button onClick={fetchGroups}>
                            <FontAwesomeIcon icon={faList} /> View
                        </Button>
                    </div>
                </div>

                
                <div className="group-list">
                    {groups.length > 0 ? (
                        groups.map((group) => (
                            <div key={group.id} className="group-item">
                                <h5>{group.name}</h5>
                                <p>{group.description}</p>
                                <Button variant="primary" onClick={() => handleJoinGroup(group.id, group.name)}>Join</Button>
                            </div>
                        ))
                    ) : (
                        <p>No groups found.</p>
                    )}
                </div>
            </div>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🎉 Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{successMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Create Group Modal */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleCreateGroup}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Groups;
