"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, BarChart2, MapPin, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

type CrimeStat = {
  category: string
  count: number
  trend: "up" | "down"
  percent: number
}

type Props = {
  isOpen: boolean
  onClose: () => void
  location: string
  safetyScore: number
  crimeStats: CrimeStat[]
  resources: { name: string; distance: string }[]
  coords: { latitude: number; longitude: number }[]
}

export default function MapSidebarDrawer({
  isOpen,
  onClose,
  location,
  safetyScore,
  crimeStats,
  resources,
  coords,
}: Props) {

  return (
  
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-16 right-0 h-full w-full sm:w-[400px] z-10 bg-black/60 backdrop-blur-md border-l border-white/10 shadow-lg p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-semibold">Safety Snapshot:<br />{location}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Safety Score */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-500/30 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">{safetyScore}</span>
            </div>
            <div>
              <p className={`text-sm font-medium ${safetyScore > 70 ? "text-green-400" : safetyScore > 40 ? "text-yellow-400" : "text-red-400"}`}>
                {safetyScore > 70 ? "Low Risk" : safetyScore > 40 ? "Moderate Risk" : "High Risk"}
              </p>
              <p className="text-xs text-white/70">Last updated: Today</p>
            </div>
          </div>

	  {/* lat/lng coordinates */}
	  <div className="bg-white/5 backdrop-blur-sm rounded-md px-4 py-2 mb-6 border border-white/10">
  	    <p className="text-xs text-white/70 mb-1">Coordinates of Pin:</p>
  	    {coords && coords.length > 0 ? (
    	    <>
      	    <p className="text-sm text-white font-mono">
              Latitude: <span className="font-semibold">{coords[0]?.latitude?.toFixed(5)}</span>
      	    </p>
      	    <p className="text-sm text-white font-mono">
              Longitude: <span className="font-semibold">{coords[0]?.longitude?.toFixed(5)}</span>
      	    </p>
    	    </>
  	    ) : (
    	      <p className="text-sm text-white font-mono">No Coordinates Available</p>
  	    )}
	  </div>

          {/* CRIME STATS DISPLAY */}
          <div className="mb-8">
            <h3 className="text-white font-semibold text-md mb-2 flex items-center gap-2">
              <BarChart2 className="h-4 w-4" /> Crime Stats
            </h3>
            <div className="space-y-2">
              {crimeStats.map((stat, i) => (
                <div key={i} className="bg-white/10 rounded-lg px-3 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{stat.category}</span>
                    <div className="flex items-center gap-2">
                      {/* Mini bar in line */}
                      <div className="relative pt-1 w-40">
                        <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-700">
                          <div
                            style={{ width: `${Math.min((stat.count / 100) * 100, 100)}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${stat.trend === "down" ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                        </div>
                      </div>
                      {/* end mini bar */}
                      <span className="text-white font-medium">{stat.count}</span>
                      <span className={`flex items-center text-sm ${stat.trend === "down" ? "text-green-400" : "text-red-400"}`}>
                        {stat.trend === "down" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                        {stat.percent}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESOURCES DISPLAY */}
          <div className="mb-8">
            <h3 className="text-white font-semibold text-md mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" /> Nearby Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((r, i) => (
                <li key={i} className="flex items-center gap-3">
                  <MapPin className="text-white w-5 h-5" />
                  <div>
                    <p className="text-white font-medium">{r.name}</p>
                    <p className="text-xs text-blue-100">{r.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* link for full page report */}
          <Link
            href={`/safety-report?location=${encodeURIComponent(location)}`}
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition-colors"
          >
            View Full Safety Report
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}