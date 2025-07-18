import axios from 'axios';
import { getAuthToken } from './utils/auth';

const API_URL = "http://127.0.0.1:8000/api/";


const configureAxios = () => {
  const token = getAuthToken();
  if (token) {
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

// Study Groups
export const fetchStudyGroups = async () => {
    try {
        const response = await axios.get(`${API_URL}groups/`, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error fetching study groups", error);
        return [];
    }
};

export const createStudyGroup = async (groupData) => {
    try {
        const response = await axios.post(`${API_URL}groups/`, groupData, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error creating study group", error);
        throw error;
    }
};

export const joinStudyGroup = async (groupId) => {
    try {
        const response = await axios.post(`${API_URL}groups/${groupId}/join/`, {}, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error joining study group", error);
        throw error;
    }
};

// Discussions
export const fetchDiscussions = async () => {
    try {
        const response = await axios.get(`${API_URL}discussions/view/`, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error fetching discussions", error);
        return [];
    }
};

export const createDiscussion = async (discussionData) => {
    try {
        const response = await axios.post(`${API_URL}discussions/create/`, discussionData, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error creating discussion", error);
        throw error;
    }
};

export const addComment = async (discussionId, commentData) => {
    try {
        const response = await axios.post(`${API_URL}discussions/${discussionId}/comment/`, commentData, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error adding comment", error);
        throw error;
    }
};

// User Profile
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}profile/`, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile", error);
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_URL}profile/`, profileData, configureAxios());
        return response.data;
    } catch (error) {
        console.error("Error updating user profile", error);
        throw error;
    }
};

// Authentication
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}token/`, credentials);
        return response.data;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register/`, userData);
        return response.data;
    } catch (error) {
        console.error("Registration error", error);
        throw error;
    }
};

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
        return response.data;
    } catch (error) {
        console.error("Token refresh error", error);
        throw error;
    }
};