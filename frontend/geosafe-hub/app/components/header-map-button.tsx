"use client"

import { useState } from "react"
import { Map } from "lucide-react"
import MapPopup from "./map-popup"

export default function HeaderMapButton() {
  const [mapPopupOpen, setMapPopupOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMapPopupOpen(true)}
        className="p-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Open safety map"
      >
        <Map className="h-6 w-6" />
      </button>

      {mapPopupOpen && <MapPopup onClose={() => setMapPopupOpen(false)} />}
    </>
  )
}

