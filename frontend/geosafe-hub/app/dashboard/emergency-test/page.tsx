"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AxiosInstance from "@/components/AxiosInstance";

const EmergencyTestPage = () => {
  const [location, setLocation] = useState("");
  const [safetyIndex, setSafetyIndex] = useState("");
  const [response, setResponse] = useState<{
    data?: any;
    error?: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  //auth token retrieval
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  // refresh token retrieval
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token found.");
        return null;
      }
      const response = await AxiosInstance.post("/token/refresh/", {
        refresh: refreshToken,
      });

      localStorage.setItem("authToken", response.data.access);
      setToken(response.data.access); // Update state with new token
      return response.data.access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  };

  const sendData = async () => {
    try {
      let authToken = token;
      if (!authToken) {
        console.warn("No access token found. Attempting to refresh...");
        authToken = await refreshAccessToken();
        if (!authToken) {
          console.error("Failed to refresh token. User needs to log in again.");
          return;
        }
      }
      

      const res = await AxiosInstance.post(
        "/emergency/sendAlert/",
        {
          location: location,
          safety_index: safetyIndex,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div>
      <h1>Emergency Test Page</h1>
      <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Safety Index"
        value={safetyIndex}
        onChange={(e) => setSafetyIndex(e.target.value)}
      />
      <button onClick={sendData}>Send Data</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default EmergencyTestPage;
