import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaComments } from "react-icons/fa";
import Sidebar from "./Sidebar"; 
import "./styles/Discussions.css";

const Discussion = () => {
    const navigate = useNavigate();
    const [discussions, setDiscussions] = useState([]);
    const [filteredDiscussions, setFilteredDiscussions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        fetchDiscussions();
    }, []);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No authentication token found! Redirecting to login.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/groups/view/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error("Failed to fetch groups:", response.status);
                return;
            }

            const data = await response.json();
            console.log("Fetched Groups:", data);
            setGroups(data);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    const fetchDiscussions = async () => {
        const token = localStorage.getItem("accessToken");
        console.log("Stored Token:", token);

        if (!token) {
            console.error("No authentication token found! Redirecting to login.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/discussions/view/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error("Failed to fetch discussions:", response.status);
                return;
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                console.error("Unexpected API response format:", data);
                return;
            }

            console.log("Fetched Discussions Data:", data);
            setDiscussions(data);
            setFilteredDiscussions(data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = discussions.filter((discussion) =>
            discussion.title.toLowerCase().includes(query)
        );
        setFilteredDiscussions(filtered);
    };

    const handleNewDiscussion = async () => {
        if (!newDiscussion.title || !newDiscussion.content || !selectedGroup) {
            alert("Please fill in all fields.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            console.error("No authentication token found! Redirecting to login.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/discussions/create/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newDiscussion.title,
                    content: newDiscussion.content,
                    group_id: selectedGroup,
                }),
            });

            if (response.ok) {
                setShowModal(false);
                setNewDiscussion({ title: "", content: "" });
                // setSelectedGroup("");
                fetchDiscussions();
            } else {
                console.error("Failed to create discussion:", response.status);
            }
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    return (
        <div className="discussion-container">
            <Sidebar />
            <div className="main-content">
                <h2 className="page-title"><FaComments /> Discussion Forum</h2>
                <p>Engage in academic discussions, share insights, and stay updated!</p>

                {/* Search Bar */}
                <InputGroup className="search-bar">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search discussions..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </InputGroup>

                {/* Start New Discussion Button */}
                <Button className="start-discussion-btn" onClick={() => setShowModal(true)}>
                    <FaPlus /> Start New Discussion
                </Button>

                {/* Discussion List */}
                <div className="discussion-list">
                    {filteredDiscussions.length > 0 ? (
                        filteredDiscussions.map((discussion) => (
                            <Card key={discussion.id} className="discussion-card">
                                <Card.Body>
                                    <Card.Title>{discussion.title}</Card.Title>
                                    <Card.Text>{discussion.content.slice(0, 100)}...</Card.Text>
                                    <Button variant="outline-primary">View More</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No discussions found.</p>
                    )}
                </div>
            </div>

            {/* Modal for New Discussion */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Start a New Discussion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select Group</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedGroup}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                console.log("Selected Group Changed:", selectedValue);  
                                setSelectedGroup(selectedValue);
                            }}
                        >
                            <option value="">-- Select a Group --</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </Form.Control>

                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newDiscussion.title}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newDiscussion.content}
                            onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleNewDiscussion}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Discussion;
