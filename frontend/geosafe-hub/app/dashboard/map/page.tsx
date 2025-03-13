"use client"

import { useState } from "react"
import { MapPin, Search, Layers, Filter, Info } from "lucide-react"

export default function SafetyMap() {
  const [mapView, setMapView] = useState("standard")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for map markers
  const markers = [
    { id: 1, name: "Home", lat: 40.7128, lng: -74.006, score: 82 },
    { id: 2, name: "Work", lat: 40.758, lng: -73.9855, score: 75 },
    { id: 3, name: "Gym", lat: 40.7431, lng: -73.9712, score: 68 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Safety Map</h1>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <button
            onClick={() => setMapView("standard")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              mapView === "standard" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setMapView("heatmap")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              mapView === "heatmap" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Safety Heatmap
          </button>
          <button
            onClick={() => setMapView("satellite")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              mapView === "satellite" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search for a location..."
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50">
              <Layers className="mr-2 h-4 w-4" />
              Layers
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter Safety Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="crime-type" className="block text-xs font-medium text-gray-700">
                  Crime Type
                </label>
                <select
                  id="crime-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>All Types</option>
                  <option>Theft</option>
                  <option>Assault</option>
                  <option>Burglary</option>
                  <option>Vehicle Crime</option>
                </select>
              </div>
              <div>
                <label htmlFor="time-period" className="block text-xs font-medium text-gray-700">
                  Time Period
                </label>
                <select
                  id="time-period"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
              <div>
                <label htmlFor="safety-score" className="block text-xs font-medium text-gray-700">
                  Minimum Safety Score
                </label>
                <select
                  id="safety-score"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Any</option>
                  <option>50+</option>
                  <option>60+</option>
                  <option>70+</option>
                  <option>80+</option>
                  <option>90+</option>
                </select>
              </div>
              <div>
                <label htmlFor="radius" className="block text-xs font-medium text-gray-700">
                  Search Radius
                </label>
                <select
                  id="radius"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>1 mile</option>
                  <option>2 miles</option>
                  <option>5 miles</option>
                  <option>10 miles</option>
                  <option>25 miles</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-[600px] bg-gray-200">
          {/* This would be replaced with an actual map component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Interactive Safety Map</h3>
              <p className="mt-1 text-sm text-gray-500">
                This is where the interactive map would be displayed. <br />
                Current view: <span className="font-medium">{mapView}</span>
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Markers on map:</p>
                <ul className="mt-2 space-y-2">
                  {markers.map((marker) => (
                    <li
                      key={marker.id}
                      className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mx-1"
                    >
                      <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm">{marker.name}</span>
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                        {marker.score}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-xs font-medium text-gray-700">Safety Score Legend</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-600">0-40: High Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-xs text-gray-600">41-70: Moderate Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">71-100: Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Understanding the Safety Map</h2>
        <p className="text-sm text-gray-600 mb-4">
          Our safety map provides a visual representation of safety scores across different areas. The color-coded
          system helps you quickly identify areas of concern and make informed decisions about where to live, work, or
          visit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">Data Sources</h3>
            <p className="text-sm text-gray-600">
              Our safety scores are calculated using official crime statistics, emergency response data, user reports,
              and other reliable sources that are updated regularly.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">Customization</h3>
            <p className="text-sm text-gray-600">
              Customize your map view by applying filters, changing the map type, or adjusting the search radius to
              focus on the information that matters most to you.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">Save Locations</h3>
            <p className="text-sm text-gray-600">
              Save important locations to your profile to receive alerts about safety changes, track safety trends over
              time, and quickly access safety information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

