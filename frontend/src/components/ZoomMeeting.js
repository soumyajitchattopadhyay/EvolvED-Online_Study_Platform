import React, { useState } from "react";
import { scheduleMeeting } from "../api/zoom";

const ZoomMeeting = () => {
    const [meeting, setMeeting] = useState(null);
    const [recurrence, setRecurrence] = useState(false);
    const [recurrenceType, setRecurrenceType] = useState("weekly");
    const [recurrenceInterval, setRecurrenceInterval] = useState(1);

    const handleCreateMeeting = async () => {
        const meetingDetails = {
            topic: "Django + Zoom Integration",
            start_time: new Date().toISOString(),
            duration: 30,
            agenda: "Discuss Zoom API Integration",
            is_recurring: recurrence,
            recurrence_type: recurrence ? recurrenceType : null,
            recurrence_interval: recurrence ? recurrenceInterval : null,
        };

        const response = await scheduleMeeting(meetingDetails);
        setMeeting(response);
    };

    return (
        <div>
            <h2>Schedule Zoom Meeting</h2>
            <label>
                Recurring Meeting:
                <input 
                    type="checkbox" 
                    checked={recurrence} 
                    onChange={() => setRecurrence(!recurrence)} 
                />
            </label>

            {recurrence && (
                <>
                    <label>
                        Recurrence Type:
                        <select 
                            value={recurrenceType} 
                            onChange={(e) => setRecurrenceType(e.target.value)}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </label>
                    <label>
                        Interval:
                        <input 
                            type="number" 
                            min="1" 
                            value={recurrenceInterval} 
                            onChange={(e) => setRecurrenceInterval(e.target.value)} 
                        />
                    </label>
                </>
            )}

            <button onClick={handleCreateMeeting}>Create Zoom Meeting</button>

            {meeting && (
                <div>
                    <p>Meeting Link: <a href={meeting.join_url} target="_blank" rel="noopener noreferrer">{meeting.join_url}</a></p>
                </div>
            )}
        </div>
    );
};

export default ZoomMeeting;
