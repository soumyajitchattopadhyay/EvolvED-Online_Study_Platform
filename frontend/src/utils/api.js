const API_BASE_URL = "http://127.0.0.1:8000/api/groups/";

// Fetch all groups
export const fetchGroups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/view/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    if (!response.ok) throw new Error("Failed to fetch groups");
    return await response.json();
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

// Create a new group
export const createGroup = async (groupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(groupData),
    });
    if (!response.ok) throw new Error("Failed to create group");
    return await response.json();
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

// Join a group
export const joinGroup = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/join/${groupId}/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    if (!response.ok) throw new Error("Failed to join group");
    return await response.json();
  } catch (error) {
    console.error("Error joining group:", error);
    return null;
  }
};
