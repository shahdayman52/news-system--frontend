import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";

const FetchUsername = () => {
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsername = async () => {
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const userId = decodedToken.id;
          const response = await apiClient.get(`/api/users/${userId}/username`);
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };
    fetchUsername();
  }, [token]);

  return (
    <div className="username">
      {username ? <h1>Hello, {username}!</h1> : <h1>Welcome!</h1>}
    </div>
  );
};

export default FetchUsername;
