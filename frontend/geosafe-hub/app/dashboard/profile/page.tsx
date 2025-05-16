"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  User as UserIcon,
  MapPin,
  Phone,
  Mail,
  Edit,
  Save,
  X,
} from "lucide-react";
import AxiosInstance from "@/components/AxiosInstance";

// Define the User type
interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfileSettings() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<User | null>(null); // User data state with typing
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false); // To control popup visibility
  const [updateStatus, setUpdateStatus] = useState(false); // To track if profile was updated

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;
      const response = await AxiosInstance.post("/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("authToken", response.data.access);
      setToken(response.data.access);
      return response.data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  };

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      let authToken = token || (await refreshAccessToken());
      if (!authToken) return;
      const res = await AxiosInstance.get("/user-details/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>You are not logged in.</h2>
        <button onClick={() => (window.location.href = "/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  // Handle saving changes
  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      let authToken = token || (await refreshAccessToken());
      if (!authToken) return;

      const response = await AxiosInstance.put(
        "/user-update/", // Assuming this endpoint updates the user details
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setUser(response.data); // Update the user state with the response data
      setEditing(false); // Exit editing mode
      setUpdateStatus(true); // Set profile updated status
      setModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
        {activeTab === "profile" && !updateStatus && (
          <button
            onClick={() => setEditing(!editing)}
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {editing ? (
              <>
                <X className="h-5 w-5 mr-2" />
                Cancel Editing
              </>
            ) : (
              <>
                <Edit className="h-5 w-5 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        )}

        {updateStatus && (
          <div className="text-green-600 mt-3">
            Profile Updated Successfully!
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profile Information
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && user && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your personal information is used to provide you with personalized
              safety alerts and recommendations.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <UserIcon className="h-16 w-16 text-gray-500" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {user.first_name + " " + user.last_name}
                  </h4>
                </div>
              </div>
              <div className="sm:w-2/3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={user.first_name}
                      onChange={(e) =>
                        setUser({ ...user, first_name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {user.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={user.last_name}
                      onChange={(e) =>
                        setUser({ ...user, last_name: e.target.value })
                      }
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {user.last_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    {editing ? (
                      <input
                        type="email"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{user.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    {editing ? (
                      <input
                        type="tel"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{user.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Home Address
                  </label>
                  <div className="mt-1 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    {editing ? (
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={user.address}
                        onChange={(e) =>
                          setUser({ ...user, address: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{user.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          {editing && (
            <div className="px-4 py-3 sm:px-6 text-right">
              <button
                onClick={handleSaveChanges}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
