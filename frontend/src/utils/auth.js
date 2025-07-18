// Store the authentication token in localStorage
export const setAuthToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenExpiration", Date.now() + 60 * 60 * 1000); 
  };
  
  // Get the authentication token from localStorage
  export const getAuthToken = async () => {
    let token = localStorage.getItem("accessToken");
  
    if (!token) {
      console.warn("No token found! Redirecting to login...");
      return null;
    }
  
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration && Date.now() > Number(tokenExpiration)) {
      console.log("Token expired! Attempting to refresh...");
      const refreshedToken = await refreshToken();
      if (!refreshedToken) {
        console.error("Token refresh failed! Redirecting to login...");
        return null;
      }
      token = refreshedToken;
    }
  
    return token;
  };
  
  // Remove the authentication token from localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = async () => {
    const token = await getAuthToken();
    return !!token;
  };
  
  // Get authentication headers for API requests
  export const getAuthHeaders = async () => {
    const token = await getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  
  // Get user data from localStorage
  export const getUserData = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };
  
  // Login User
  export const loginUser = async (credentials) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log("API Login Response:", data);

        if (!response.ok) {
            return { error: data.detail || "Invalid credentials" };
        }

        setAuthToken(data.access, data.refresh);
        console.log("Tokens stored successfully!");
        return data;
    } catch (error) {
        console.error("Network error during login:", error);
        return { error: "Network error. Please try again." };
    }
};

  
  // Logout function
  export const logoutUser = (navigate) => {
    removeAuthToken();
    if (navigate) {
      navigate("/login");
    }
  };
  
  // Refresh token function
  export const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");

    if (!refresh) {
        console.error("No refresh token found! Logging out...");
        logoutUser();
        return null;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });

        if (!response.ok) {
            console.error("Refresh failed. Logging out...");
            logoutUser();
            return null;
        }

        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        console.log("Token refreshed successfully!");
        return data.access;
    } catch (error) {
        console.error("Error refreshing token:", error);
        logoutUser();
        return null;
    }
};
