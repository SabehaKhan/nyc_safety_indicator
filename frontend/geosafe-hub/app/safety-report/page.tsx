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
import { useState, useEffect } from "react"
import Footer from "../components/footer"
import ReviewList from "../components/review-list";
import CrimeChartSection from "../components/CrimeStats"
import CrimeLineGraph from "../components/CrimeTrendsChart"


export default function SafetyReportPage() {

  const [selectedLocation, setSelectedLocation] = useState("Manhattan")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSeriousCrimes, setShowSeriousCrimes] = useState(false)
  const [showPieChart, setShowPieChart] = useState(false)
  const [selectedCrime, setSelectedCrime] = useState("Theft")
  const [searchQuery, setSearchQuery] = useState(""); //for search in dropdown (reuse component for map?)
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]); //for dropdown search


  // NYC locations data REPLACE
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


  //flatten arr for dropdown
  const allLocations = [
    ...nycLocations.boroughs,
    ...Object.values(nycLocations.neighborhoods).flat()
  ];

  //hook for search; runs when searchQuery chnges, filters locations arr (might have to chnge depending on database setup)
  useEffect(() => {
    const results = allLocations.filter(location =>
      location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(results);
  }, [searchQuery]);

  // PLACEHOLDER DATA
  const safetyScores = {
    Manhattan: 73,
    Brooklyn: 68,
    Queens: 71,
    Bronx: 62,
    "Staten Island": 78,
    "Upper East Side": 82,
    Harlem: 65,
    "Bay Ridge": 76,
  }

  const safetyScore = safetyScores[selectedLocation] || 70 //default score for if fetch fails- USE IN HOOK for location fetching when integrating with backend
  
  const lastUpdated = "Today at 09:45"


  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
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

        <Link
          href="/"
          className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2 inline" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {selectedLocation} Safety Report
                </h1>

                <div className="relative mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white hover:bg-white/20"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{selectedLocation}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

		  {dropdownOpen && (
  		    <div className="absolute z-10 mt-1 w-64 max-h-96 overflow-y-auto bg-black/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
    		      <div className="p-2">
		      
		      // SEARCH INPUT FOR DROPDOWN
      		      	 <input
                          type="text"
                          placeholder="Search locations..."
                          className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
			
    		      </div>

		      {filteredLocations.length > 0 ? (
                        <div className="p-2">
                          {filteredLocations.map((location) => (
                            <button
                              key={location}
                              onClick={() => {
                                setSelectedLocation(location);
                                setDropdownOpen(false);
                                setSearchQuery(""); //clear search on selection
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md ${
                                selectedLocation === location ? "bg-blue-500/50 text-white" : "text-white/90 hover:bg-white/10"
                              }`}
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-white/70">No locations found.</div> //if none found
                      )}
                    </div>
                  )}
                </div>
              </div>
		      

              <div className="mt-4 md:mt-0 flex items-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
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
              <div className="overflow-hidden h-2 rounded bg-gray-700">
                <div
                  style={{ width: `${safetyScore}%` }}
                  className="bg-blue-500 h-full"
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-blue-100">
                <span>0 - High Risk</span>
                <span>50 - Moderate</span>
                <span>100 - Low Risk</span>
              </div>
            </div>

            <div className="mb-8">
              <CrimeChartSection
                location={selectedLocation}
  		showSeriousCrimes={showSeriousCrimes}
  		setShowSeriousCrimes={setShowSeriousCrimes}
  		selectedCrime={selectedCrime}
  		setSelectedCrime={setSelectedCrime}
              />
            </div>

            <div className="mb-8">
              <CrimeLineGraph location={selectedLocation}
	        location={selectedLocation}
  		selectedCrime={selectedCrime}
	      />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                <Shield className="inline-block h-5 w-5 mr-2" />
                Community Reviews
              </h2>
              <ReviewList location={selectedLocation} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}