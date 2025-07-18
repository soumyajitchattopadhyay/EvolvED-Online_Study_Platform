import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from "react-bootstrap";
import { fetchMeetings, scheduleMeeting, reoccurMeeting, joinMeeting } from "./api/zoom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faComments, faCalendar, faCog, faSearch, faCheckCircle, faRedo, faBars, faPlus, faSignInAlt, faClock, faEye, faDashboard } from '@fortawesome/free-solid-svg-icons';
import "./styles/Meetings.css";

const Meetings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [meetings, setMeetings] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [meetingData, setMeetingData] = useState({
        topic: "",
        date: "",
        startTime: "",
        endTime: "",
        isRecurring: false,
        recurrenceType: "weekly",
        recurrenceInterval: 1
    });

    const loadMeetings = async () => {
        try {
            const data = await fetchMeetings();
            console.log("Fetched Meetings Data:", data);
            setMeetings(data);
        } catch (error) {
            setErrorMessage("Error fetching meetings.");
            console.error("Error fetching meetings:", error);
        }
    };

    useEffect(() => {
        loadMeetings();
    }, []);

    const handleChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!meetingData.topic || !meetingData.date || !meetingData.startTime || !meetingData.endTime) {
            setErrorMessage("Please enter all required details before scheduling the meeting!");
            return;
        }

        try {
            const newMeeting = await scheduleMeeting({
                topic: meetingData.topic,
                start_time: `${meetingData.date}T${meetingData.startTime}:00Z`,
                duration: 30,
                agenda: "Scheduled Meeting",
                is_recurring: meetingData.isRecurring,
                recurrence_type: meetingData.recurrenceType,
                recurrence_interval: meetingData.recurrenceInterval,
            });

            if (newMeeting.error) {
                setErrorMessage("Failed to schedule meeting.");
                return;
            }

            setShowModal(false);
            setMeetingData({
                topic: "",
                date: "",
                startTime: "",
                endTime: "",
                isRecurring: false,
                recurrenceType: "weekly",
                recurrenceInterval: 1
            });

            loadMeetings(); // Refresh meetings list after scheduling

        } catch (error) {
            setErrorMessage("Failed to schedule meeting.");
        }
    };

    const handleJoinMeeting = async (meetingId) => {
        try {
            const response = await joinMeeting(meetingId);
            if (response.join_url) {
                window.open(response.join_url, "_blank");
            }
        } catch (error) {
            setErrorMessage("Failed to join the meeting.");
        }
    };

    const handleReoccur = async (meetingId) => {
        try {
            const newMeeting = await reoccurMeeting(meetingId);
            loadMeetings(); // Refresh meetings list
        } catch (error) {
            setErrorMessage("Failed to reoccur meeting.");
        }
    };

    const handleViewMeeting = async (meetingId) => {
        if (!meetingId) {
            console.error("Invalid meeting ID");
            return;
        }

        try {
            const response = await fetchMeetings(); // Fetch meeting details
            console.log("Meeting Details:", response);
        } catch (error) {
            console.error("Failed to fetch meeting details:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
    };

    return (
        <div className="meetings-container">
            <div className="top-navbar">
                <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h2 className="brand"><FontAwesomeIcon icon={faCalendar} /> Meetings</h2>
                <Button variant="outline-dark" className="logout-btn" onClick={handleLogout}>Logout</Button>
            </div>

            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <ul>
                    <li><Link to="/dashboard/"><FontAwesomeIcon icon={faDashboard} /> Dashboard</Link></li>
                    <li><Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link></li>
                    <li><Link to="/discussions"><FontAwesomeIcon icon={faComments} /> Discussion</Link></li>
                    <li className="active"><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /> Meetings</Link></li>
                    <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Settings</Link></li>
                </ul>
            </div>

            <div className="main-content">
                <Container>
                    <Form className="search-bar">
                        <input type="text" placeholder="Search meetings" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>

                    <Button className="schedule-btn" onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Schedule New Meeting
                    </Button>

                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Schedule a Meeting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meeting Topic</Form.Label>
                                    <Form.Control type="text" name="topic" value={meetingData.topic} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name="date" value={meetingData.date} onChange={handleChange} required />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="time" name="startTime" value={meetingData.startTime} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Time</Form.Label>
                                            <Form.Control type="time" name="endTime" value={meetingData.endTime} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button variant="success" onClick={handleSubmit}>Save Meeting</Button>
                        </Modal.Footer>
                    </Modal>

                    <h3>Upcoming Meetings</h3>
                    {meetings.length > 0 ? (
                        <Row>
                            {meetings.map(meeting => (
                                <Col key={meeting.id} md={4}>
                                    <Card>
                                        <h5>{meeting.topic}</h5>
                                        <Button onClick={() => handleViewMeeting(meeting.id)}>View</Button>
                                        <Button onClick={() => handleJoinMeeting(meeting.id)}>Join</Button>
                                        <Button onClick={() => handleReoccur(meeting.id)}>Reoccur</Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : <p>No upcoming meetings.</p>}
                </Container>
            </div>
        </div>
    );
};

export default Meetings;
