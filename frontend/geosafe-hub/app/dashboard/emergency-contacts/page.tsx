"use client";
import { useEffect, useState } from "react";
import AxiosInstance from "@/components/AxiosInstance";

const EmergencyPage = () => {
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyCarrier, setEmergencyCarrier] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<
    { id: number; name: string; phone_number: string; carrier: string }[]
  >([]);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchEmergencyContact();
    }
  }, [token]);

  // Function to Refresh Token
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

  // Fetch Emergency Contacts with Token Refreshing
  const fetchEmergencyContact = async () => {
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

      const response = await AxiosInstance.get("/emergency/fetch/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setEmergencyContacts(response.data);
    } catch (error) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        fetchEmergencyContact(); // Retry fetching after refreshing
      } else {
        console.error(error);
      }
    }
  };

  // Delete Emergency Contact
  const deleteEmergencyContact = async (name: string, phone_number: string) => {
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

      const response = await AxiosInstance.post(
        "/emergency/delete/",
        { name, phone_number },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update contacts by removing the deleted contact
      setEmergencyContacts(response.data);
    } catch (error) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        fetchEmergencyContact(); // Retry fetching after refreshing
      } else {
        console.error(error);
        alert("Failed to delete emergency contact.");
      }
    }
  };

  // Handle Adding Emergency Contact
  const handleAddEmergencyContact = async () => {
    if (!emergencyName || !emergencyPhone) {
      alert("Please enter a name and phone number");
      return;
    }

    try {
      let authToken = token;
      if (!authToken) {
        authToken = await refreshAccessToken();
        if (!authToken) {
          alert("Session expired. Please log in again.");
          return;
        }
      }

      const response = await AxiosInstance.post(
        "/emergency/add/",
        {
          name: emergencyName,
          phone_number: emergencyPhone,
          carrier: emergencyCarrier,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEmergencyContacts([...emergencyContacts, response.data]);
      fetchEmergencyContact();
    } catch (error) {
      console.error("Error adding emergency contact:", error);
      alert("Failed to add emergency contact.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Emergency Contacts
      </h1>

      {/* Add Emergency Contact */}
      <h2 className="text-xl font-semibold mb-4">Add Emergency Contact</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Emergency Contact Name"
          value={emergencyName}
          onChange={(e) => setEmergencyName(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Emergency Contact Phone"
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        />
        <select
          value={emergencyCarrier}
          onChange={(e) => setEmergencyCarrier(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select Carrier</option>
          <option value="AT&T">AT&T</option>
          <option value="Verizon">Verizon</option>
          <option value="T-Mobile">T-Mobile</option>
          <option value="Sprint">Sprint</option>
          <option value="Lyca">Lyca</option>
          {/* Add more carrier options here */}
        </select>

        <button
          onClick={handleAddEmergencyContact}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Add Emergency Contact
        </button>
      </div>

      {/* Display Emergency Contacts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Saved Emergency Contacts</h2>
        <ul>
          {emergencyContacts.map((contact, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg shadow mb-2 flex justify-between items-center"
            >
              <span>
                {contact.name} - {contact.phone_number}
              </span>
              <button
                onClick={() =>
                  deleteEmergencyContact(contact.name, contact.phone_number)
                }
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmergencyPage;
