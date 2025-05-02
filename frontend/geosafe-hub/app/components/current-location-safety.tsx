"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Shield,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AxiosInstance from "@/components/AxiosInstance";

type LocationData = {
  latitude: number;
  longitude: number;
  address: string | null;
  neighborhood: string | null;
};

type SafetyScoreData = {
  score: number;
  area_name: string;
  risk_level: string;
};

type PermissionStatus =
  | "not_asked"
  | "granted"
  | "denied"
  | "unavailable"
  | "insecure_context";

export default function CurrentLocationSafety() {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("not_asked");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Safety score from API
  const [safetyScoreData, setSafetyScoreData] =
    useState<SafetyScoreData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Get token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  // Check if we're in a secure context on component mount
  useEffect(() => {
    // Check if we're in a secure context (HTTPS)
    if (typeof window !== "undefined" && window.isSecureContext === false) {
      setPermissionStatus("insecure_context");
      setError(
        "Geolocation requires a secure connection (HTTPS). Using demo mode."
      );
    }
  }, []);

  // Function to request location permission and get coordinates
  const requestLocationPermission = () => {
    setIsLoading(true);
    setError(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setPermissionStatus("unavailable");
      setError(
        "Geolocation is not supported by your browser. Using demo mode."
      );
      setIsLoading(false);
      // Load demo data after a short delay
      setTimeout(() => loadDemoLocation(), 500);
      return;
    }

    // Try to get the current position
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          setPermissionStatus("granted");
          setLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: null,
            neighborhood: null,
          });

          // Get address and neighborhood from coordinates using reverse geocoding
          fetchAddressAndNeighborhood(
            position.coords.latitude,
            position.coords.longitude
          );

          // Get safety score for this location from API
          fetchSafetyScoreFromAPI(
            position.coords.latitude,
            position.coords.longitude
          );

          setIsLoading(false);
        },
        (geoError) => {
          // Error callback
          console.error("Geolocation error:", geoError.code, geoError.message);
          setPermissionStatus("denied");

          // Handle specific error codes
          if (geoError.code === 1) {
            // Permission denied
            setError("Location access was denied. Using demo mode instead.");
          } else if (geoError.code === 2) {
            // Position unavailable
            setError(
              "Unable to determine your location. Using demo mode instead."
            );
          } else if (geoError.code === 3) {
            // Timeout
            setError("Location request timed out. Using demo mode instead.");
          } else {
            // Other errors
            setError(
              "An error occurred while getting your location. Using demo mode instead."
            );
          }

          setIsLoading(false);
          // Load demo data after a short delay
          setTimeout(() => loadDemoLocation(), 500);
        },
        // Options
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } catch (error) {
      console.error("Error requesting geolocation:", error);
      setPermissionStatus("unavailable");
      setError("Unable to access location services. Using demo mode instead.");
      setIsLoading(false);
      // Load demo data after a short delay
      setTimeout(() => loadDemoLocation(), 500);
    }
  };

  // Function to refresh token if needed
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

  // Function to fetch address and neighborhood using reverse geocoding
  const fetchAddressAndNeighborhood = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      // Use OpenStreetMap's Nominatim for reverse geocoding (free, no API key required)
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      // Make the request with a custom User-Agent as required by Nominatim's ToS
      const response = await fetch(url, {
        headers: { "User-Agent": "SafetyApp/1.0" },
      });

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Geocoding response:", data);

      // Extract address components
      const addressObj = data.address || {};

      // Try different fields that might contain neighborhood info
      // Different regions have different address formats in OSM
      const neighborhood =
        addressObj.neighbourhood ||
        addressObj.suburb ||
        addressObj.district ||
        addressObj.quarter ||
        addressObj.city_district ||
        addressObj.town ||
        "Unknown Area";

      // Format full address
      const city =
        addressObj.city || addressObj.town || addressObj.village || "";
      const state = addressObj.state || "";
      const formattedAddress = [neighborhood, city, state]
        .filter(Boolean)
        .join(", ");

      console.log("Determined neighborhood:", neighborhood);
      console.log("Formatted address:", formattedAddress);

      // Update location data with address info
      setLocationData((prev) =>
        prev
          ? {
              ...prev,
              address: formattedAddress || prev.address,
              neighborhood: neighborhood,
            }
          : null
      );

      // Now that we have the neighborhood, send it along with coordinates to the safety API
      fetchSafetyScoreFromAPI(latitude, longitude, neighborhood);
    } catch (error) {
      console.error("Error fetching address and neighborhood:", error);
      setError(
        "Unable to determine your exact location. Showing approximate safety data."
      );

      // Fall back to approximate method if geocoding fails
      fetchSafetyScoreFromAPI(latitude, longitude);
    }
  };

  // Function to fetch safety score from API
  const fetchSafetyScoreFromAPI = async (
    latitude: number,
    longitude: number,
    neighborhood?: string
  ) => {
    try {
      // Call the safety-score endpoint from safety_report app
      // Now including neighborhood in the request if available
      const response = await AxiosInstance.get(
        `/safety/safety-score/?ntaname=${neighborhood}`,
        
      );


      console.log("Safety Score API response:", response.data);

      // Set the safety score data from API
      setSafetyScoreData(response.data);
    } catch (error) {
      console.error("Error fetching safety score from API:", error);

      // If API call fails, try refreshing token and retrying once
      const newToken = await refreshAccessToken();
      if (newToken) {
        try {
          const response = await AxiosInstance.get("/safety/safety-score/", {
            headers: { Authorization: `Bearer ${newToken}` },
            params: {
              latitude: latitude,
              longitude: longitude,
              neighborhood: neighborhood, // Include neighborhood in retry too
            },
          });

          console.log("Safety Score API response (retry):", response.data);
          setSafetyScoreData(response.data);
        } catch (retryError) {
          console.error(
            "Error fetching safety score after token refresh:",
            retryError
          );
          setError(
            "Unable to retrieve safety data for your location from the server."
          );
          // Fall back to mock data
          fetchSafetyScore(latitude, longitude);
        }
      } else {
        setError(
          "Unable to retrieve safety data for your location from the server."
        );
        // Fall back to mock data
        fetchSafetyScore(latitude, longitude);
      }
    }
  };

  // Function to load demo location data
  const loadDemoLocation = () => {
    // Set demo location data (New York City)
    setLocationData({
      latitude: 40.7128,
      longitude: -74.006,
      address: "Manhattan, New York, NY",
      neighborhood: "Manhattan",
    });

    // Fetch demo safety score from API first
    fetchSafetyScoreFromAPI(40.7128, -74.006, "Manhattan");

    // Update permission status to show the data
    setPermissionStatus("granted");

    // Add a note that this is demo data
    setError("Showing demo data for Manhattan, New York.");
  };

  // Fallback function to fetch safety score (mock) if API fails
  const fetchSafetyScore = async (latitude: number, longitude: number) => {
    try {
      // In a real app, this would be an API call to your backend
      // This is a mock implementation

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock safety scores based on neighborhoods
      const mockSafetyScores: Record<string, number> = {
        Manhattan: 73,
        Brooklyn: 68,
        Queens: 71,
        Bronx: 62,
        "Staten Island": 78,
        "Unknown Area": 65,
      };

      // Get the neighborhood from the location data
      const neighborhood = locationData?.neighborhood || "Unknown Area";

      // Set the safety score as fallback
      setSafetyScoreData({
        score: mockSafetyScores[neighborhood],
        area_name: neighborhood,
        risk_level: getSafetyLevel(mockSafetyScores[neighborhood]).text,
      });

      console.log("Using mock safety score:", mockSafetyScores[neighborhood]);
    } catch (error) {
      console.error("Error fetching mock safety score:", error);
      setError("Unable to retrieve safety data for your location.");
    }
  };

  // View detailed safety report for this location
  const viewSafetyReport = () => {
    if (locationData?.neighborhood) {
      router.push(
        `/safety-report?location=${encodeURIComponent(
          locationData.neighborhood
        )}`
      );
    }
  };

  // Get safety level text and color based on score
  const getSafetyLevel = (score: number) => {
    if (score >= 70) return { text: "Low Risk", color: "text-green-400" };
    if (score >= 40) return { text: "Moderate Risk", color: "text-yellow-400" };
    return { text: "High Risk", color: "text-red-400" };
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">
          Your Location Safety
        </h3>

        {permissionStatus === "not_asked" && (
          <div className="text-center py-4">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-white mb-4">
              Would you like to see safety information for your current
              location?
            </p>
            <button
              onClick={requestLocationPermission}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Getting Location..." : "Share My Location"}
            </button>
            <p className="text-xs text-blue-200 mt-2">
              We only use your location to provide safety information and never
              store it.
            </p>
          </div>
        )}

        {(permissionStatus === "denied" ||
          permissionStatus === "unavailable" ||
          permissionStatus === "insecure_context") &&
          !locationData && (
            <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 text-white mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{error || "Location services are not available."}</p>
                  <div className="mt-3">
                    <button
                      onClick={() => loadDemoLocation()}
                      className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Demo Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {permissionStatus === "granted" && locationData && (
          <div>
            {error && (
              <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 mb-4 text-white text-sm">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {locationData.neighborhood || "Current Location"}
                    </h4>
                    <p className="text-blue-200 text-sm">
                      {locationData.address ||
                        `${locationData.latitude.toFixed(
                          4
                        )}, ${locationData.longitude.toFixed(4)}`}
                    </p>
                  </div>

                  {safetyScoreData !== null && (
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {safetyScoreData?.score}
                        </div>
                        <div className="text-xs text-blue-200">
                          Safety Score
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  )}
                </div>

                {safetyScoreData !== null && (
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                        <div
                          style={{ width: `${safetyScoreData?.score}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-blue-200">
                        <span>0 - High Risk</span>
                        <span>50 - Moderate</span>
                        <span>100 - Low Risk</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center">
                      <div
                        className={`text-sm font-medium ${
                          getSafetyLevel(safetyScoreData?.score || 0).color
                        }`}
                      >
                        {safetyScoreData?.risk_level ||
                          getSafetyLevel(safetyScoreData?.score || 0).text}
                      </div>
                      <div className="ml-auto">
                        <button
                          onClick={viewSafetyReport}
                          className="flex items-center text-blue-300 hover:text-blue-100 transition-colors"
                        >
                          View Detailed Report
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
