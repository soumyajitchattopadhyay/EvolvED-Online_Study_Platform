import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faUsers, faComments, faCalendar, faCog, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul>
                <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /><span>Dashboard</span></Link></li>
                <li><Link to="/groups"><FontAwesomeIcon icon={faUsers} /><span>Groups</span></Link></li>
                <li><Link to="/discussions"><FontAwesomeIcon icon={faComments} /><span>Discussions</span></Link></li>
                <li><Link to="/meetings"><FontAwesomeIcon icon={faCalendar} /><span>Meetings</span></Link></li>
                <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /><span>Settings</span></Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
