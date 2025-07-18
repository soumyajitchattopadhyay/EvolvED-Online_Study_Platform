const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  console.log("Logged out successfully!");
  window.location.href = "/login"; // Redirect to login page
};

return <button onClick={logout}>Logout</button>;
