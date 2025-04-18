"use client"

import { X, Search, MapPin, Shield, Layers } from "lucide-react"
import Link from "next/link"
import MapView from "../components/map-view";
import { useEffect, useRef, useState } from "react";

interface MapPopupProps {
  onClose: () => void
}

export default function MapPopup({ onClose }: MapPopupProps) {
  const [mapView, setMapView] = useState("standard")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Safety Map</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMapView("standard")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                mapView === "standard" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Street View
            </button>
            <button
              onClick={() => setMapView("heatmap")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                mapView === "heatmap" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Safety Heatmap
            </button>
            <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b bg-white/20 backdrop-blur-md ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search for a location..."
            />
          </div>
        </div>

        
        <div className="flex-1 min-h-[300px] relative">
  	      <MapView key={mapView} />

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md">
            <div className="flex items-center mb-2">
              <Layers className="h-4 w-4 text-gray-500 mr-2" />
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

        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Data updated: <span className="font-medium">Today at 9:45 AM</span>
          </div>
          <Link
  	    href="/map"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            View Full Map
          </Link>
        </div>
      </div>
    </div>
  )
}

