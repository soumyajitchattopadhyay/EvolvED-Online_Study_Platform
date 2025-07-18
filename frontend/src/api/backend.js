const API_URL = "http://127.0.0.1:8000/api/";

async function fetchAPI(endpoint, method = "GET", body = null, token = null) {
    const headers = { "Content-Type": "application/json" };
    const accessToken = localStorage.getItem("access_token"); 

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`; 
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        window.location.href = "/login"; // Redirect user if not authenticated
    }

    return response.ok ? await response.json() : Promise.reject(await response.json());
}


export async function registerUser(userData) {
    return fetchAPI("users/register/", "POST", userData);
}

export async function loginUser(credentials) {
    return fetchAPI("users/login/", "POST", credentials);
}

export async function fetchUserProfile(token) {
    return fetchAPI("users/profile/", "GET", null, token);
}

export async function fetchGroups() {
    return fetchAPI("groups/view/");
}

export async function createGroup(groupData, token) {
    return fetchAPI("groups/create/", "POST", groupData, token);
}

export async function joinGroup(groupId, token) {
    return fetchAPI(`groups/join/${groupId}/`, "POST", null, token);
}

export async function fetchDiscussions() {
    return fetchAPI("discussions/view/");
}

export async function createDiscussion(discussionData, token) {
    return fetchAPI("discussions/create/", "POST", discussionData, token);
}

export async function replyToDiscussion(discussionId, replyData, token) {
    return fetchAPI(`discussions/reply/${discussionId}/`, "POST", replyData, token);
}

export async function fetchMeetings() {
    return fetchAPI("meetings/view/");
}

export async function scheduleMeeting(meetingDetails, token) {
    return fetchAPI("meetings/schedule/", "POST", meetingDetails, token);
}

export async function joinMeeting(meetingId, token) {
    return fetchAPI(`meetings/join/${meetingId}/`, "POST", null, token);
}

export async function reoccurMeeting(meetingId, token) {
    return fetchAPI(`meetings/reoccur/${meetingId}/`, "POST", null, token);
}

const BASE_URL = "http://127.0.0.1:8000/api";

export const API = {
    LOGIN: `${BASE_URL}/users/login/`,
    PROFILE: `${BASE_URL}/users/profile/`,
    GROUPS: `${BASE_URL}/groups/`,
    MEETINGS: `${BASE_URL}/meetings/schedule/`,
    DISCUSSIONS: `${BASE_URL}/discussions/`,
};