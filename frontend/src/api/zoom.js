const API_URL = "http://127.0.0.1:8000/api/meetings/";

async function fetchAPI(endpoint, method = "GET", body = null) {
    let token = localStorage.getItem("accessToken");
    let headers = { "Content-Type": "application/json" };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    if (response.status === 401) {  
        console.warn("Token expired. Attempting refresh...");
        token = await refreshAccessToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            response = await fetch(`${API_URL}${endpoint}`, { method, headers, body: body ? JSON.stringify(body) : null });
        }
    }

    return response.ok ? response.json() : Promise.reject(await response.json());
}

export async function fetchMeetings() {
    return fetchAPI("view/");
}

export async function scheduleMeeting(meetingDetails) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        console.error("No authentication token found.");
        return { error: "User not authenticated" };
    }

    console.log("Sending Authorization Token:", token); 

    const response = await fetch(`${API_URL}schedule/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(meetingDetails),
    });

    return response.json();
}

export async function reoccurMeeting(meetingId) {
    return fetchAPI(`reoccur/${meetingId}/`, "POST");
}

export async function joinMeeting(meetingId) {
    return fetchAPI(`join/${meetingId}/`, "GET");
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.error("No refresh token found. Redirecting to login...");
        localStorage.clear();
        window.location.href = "/login"; 
        return null;
    }

    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        return data.access;
    } else {
        console.error("Failed to refresh token. Redirecting to login...");
        localStorage.clear();
        window.location.href = "/login"; 
        return null;
    }
}
