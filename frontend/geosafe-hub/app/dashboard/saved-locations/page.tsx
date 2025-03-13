"use client"

import { useState } from "react"
import { MapPin, Shield, Plus, Search, Star, StarOff, Edit, Trash2, ArrowUpDown } from "lucide-react"

export default function SavedLocations() {
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for saved locations
  const savedLocations = [
    {
      id: 1,
      name: "Home",
      address: "123 Main St, Brooklyn, NY 11201",
      score: 82,
      favorite: true,
      lastUpdated: "2 days ago",
      alerts: 0,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Park Ave, Manhattan, NY 10022",
      score: 75,
      favorite: true,
      lastUpdated: "1 day ago",
      alerts: 2,
    },
    {
      id: 3,
      name: "Gym",
      address: "789 Fitness Blvd, Queens, NY 11106",
      score: 68,
      favorite: false,
      lastUpdated: "5 days ago",
      alerts: 1,
    },
    {
      id: 4,
      name: "Parents' House",
      address: "321 Family Rd, Staten Island, NY 10301",
      score: 88,
      favorite: false,
      lastUpdated: "1 week ago",
      alerts: 0,
    },
    {
      id: 5,
      name: "Favorite Restaurant",
      address: "555 Food St, Manhattan, NY 10019",
      score: 72,
      favorite: true,
      lastUpdated: "3 days ago",
      alerts: 0,
    },
  ]

  // Filter locations based on search query
  const filteredLocations = savedLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort locations based on sort criteria
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    let comparison = 0

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "score") {
      comparison = a.score - b.score
    } else if (sortBy === "lastUpdated") {
      // This is a simplified sort for the mock data
      comparison = a.lastUpdated.localeCompare(b.lastUpdated)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Saved Locations</h1>
        <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-5 w-5 mr-2" />
          Add New Location
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleSort("name")}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                sortBy === "name" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700"
              } hover:bg-gray-50`}
            >
              Name
              {sortBy === "name" && <ArrowUpDown className="ml-1 h-4 w-4" />}
            </button>
            <button
              onClick={() => toggleSort("score")}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                sortBy === "score" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700"
              } hover:bg-gray-50`}
            >
              Safety Score
              {sortBy === "score" && <ArrowUpDown className="ml-1 h-4 w-4" />}
            </button>
            <button
              onClick={() => toggleSort("lastUpdated")}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                sortBy === "lastUpdated" ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700"
              } hover:bg-gray-50`}
            >
              Last Updated
              {sortBy === "lastUpdated" && <ArrowUpDown className="ml-1 h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {sortedLocations.length > 0 ? (
            sortedLocations.map((location) => (
              <li key={location.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">{location.name}</p>
                        {location.favorite && <Star className="ml-2 h-4 w-4 text-yellow-500" />}
                        {location.alerts > 0 && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {location.alerts} {location.alerts === 1 ? "Alert" : "Alerts"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{location.address}</p>
                      <p className="text-xs text-gray-400 mt-1">Last updated: {location.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-blue-100 px-2.5 py-0.5 rounded-full">
                      <Shield className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-blue-800">{location.score}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-yellow-500">
                        {location.favorite ? <StarOff className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                      </button>
                      <button className="text-gray-400 hover:text-blue-500">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500">
              No locations found. Try adjusting your search or add a new location.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

