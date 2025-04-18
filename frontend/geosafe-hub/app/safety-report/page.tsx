"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Shield,
  MapPin,
  BarChart2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"
import Footer from "../components/footer"

export default function SafetyReportPage() {
  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState("Manhattan")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // NYC locations data
  const nycLocations = {
    boroughs: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    neighborhoods: {
      Manhattan: ["Upper East Side", "Harlem", "Chelsea", "Greenwich Village", "Midtown"],
      Brooklyn: ["Williamsburg", "DUMBO", "Bay Ridge", "Park Slope", "Bedford-Stuyvesant"],
      Queens: ["Astoria", "Long Island City", "Flushing", "Jamaica", "Forest Hills"],
      Bronx: ["Riverdale", "Fordham", "Pelham Bay", "Mott Haven", "Concourse"],
      "Staten Island": ["St. George", "Tottenville", "Great Kills", "New Dorp", "West Brighton"],
    },
  }

  // Flatten all locations for the dropdown
  const allLocations = [...nycLocations.boroughs, ...Object.values(nycLocations.neighborhoods).flat()]

  // Mock data for the safety report - would be dynamic based on selected location
  const safetyScores = {
    Manhattan: 73,
    Brooklyn: 68,
    Queens: 71,
    Bronx: 62,
    "Staten Island": 78,
    "Upper East Side": 82,
    Harlem: 65,
    "Bay Ridge": 76,
    // Add more locations as needed
  }

  const safetyScore = safetyScores[selectedLocation] || 70 // Default score if not found
  const lastUpdated = "Today at 9:45 AM"

  const crimeStats = [
    { category: "Theft", count: 127, trend: "down", percent: 12 },
    { category: "Assault", count: 43, trend: "up", percent: 5 },
    { category: "Burglary", count: 62, trend: "down", percent: 8 },
    { category: "Vehicle Crime", count: 89, trend: "down", percent: 15 },
  ]

  const safetyTips = [
    "Stay aware of your surroundings, especially at night",
    "Keep valuables out of sight when walking in public",
    "Use well-lit and populated streets when possible",
    "Report suspicious activity to local authorities",
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10 bg-blue-900/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Safety Report</h1>

                {/* Location Selector */}
                <div className="relative mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{selectedLocation}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-64 max-h-96 overflow-y-auto bg-black/40 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search locations..."
                          className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="p-2">
                        <div className="text-white text-xs font-semibold uppercase px-2 py-1 bg-blue-900/50">
                          Boroughs
                        </div>
                        {nycLocations.boroughs.map((borough) => (
                          <button
                            key={borough}
                            onClick={() => {
                              setSelectedLocation(borough)
                              setDropdownOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md ${selectedLocation === borough ? "bg-blue-500 text-white font-medium" : "text-white hover:bg-white/20"}`}
                          >
                            {borough}
                          </button>
                        ))}
                      </div>

                      {Object.entries(nycLocations.neighborhoods).map(([borough, neighborhoods]) => (
                        <div key={borough} className="p-2 border-t border-white/20">
                          <div className="text-white text-xs font-semibold uppercase px-2 py-1 bg-blue-900/50">
                            {borough} Neighborhoods
                          </div>
                          {neighborhoods.map((neighborhood) => (
                            <button
                              key={neighborhood}
                              onClick={() => {
                                setSelectedLocation(neighborhood)
                                setDropdownOpen(false)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md ${selectedLocation === neighborhood ? "bg-blue-500/50 text-white" : "text-white/90 hover:bg-white/10"}`}
                            >
                              {neighborhood}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{safetyScore}</div>
                    <div className="text-xs text-blue-100">Safety Score</div>
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className={`text-sm font-medium ${safetyScore > 70 ? "text-green-400" : safetyScore > 40 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {safetyScore > 70 ? "Low Risk" : safetyScore > 40 ? "Moderate Risk" : "High Risk"}
                  </div>
                  <div className="text-xs text-blue-100 mt-1">Last updated: {lastUpdated}</div>
                </div>
              </div>
            </div>

            <div className="relative pt-1 mb-6">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <div
                  style={{ width: `${safetyScore}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-blue-100">
                <span>0 - High Risk</span>
                <span>50 - Moderate</span>
                <span>100 - Low Risk</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Crime Statistics for {selectedLocation}
                </h2>
                <div className="space-y-3">
                  {crimeStats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white">{stat.category}</span>
                        <div className="flex items-center">
                          <span className="text-white font-medium mr-2">{stat.count}</span>
                          <div
                            className={`flex items-center ${stat.trend === "down" ? "text-green-400" : "text-red-400"}`}
                          >
                            {stat.trend === "down" ? (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            )}
                            <span>{stat.percent}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 relative pt-1">
                        <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-700">
                          <div
                            style={{ width: `${(stat.count / 150) * 100}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${stat.trend === "down" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Safety Tips for {selectedLocation}
                </h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <ul className="space-y-3">
                    {safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-blue-100">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Nearby Resources in {selectedLocation}</h2>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Police Station</p>
                          <p className="text-blue-100 text-sm">0.8 miles away</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Hospital</p>
                          <p className="text-blue-100 text-sm">1.2 miles away</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Fire Station</p>
                          <p className="text-blue-100 text-sm">0.5 miles away</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
