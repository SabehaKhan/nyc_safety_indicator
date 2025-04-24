"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

//PLACEHOLDER DATA
const mockReviews = [
  { user: "Aaleia", comment: "Generally safe, but make sure you stay alert at night.", rating: 4, date: "2024-12-01" },
  { user: "Sabeha", comment: "Great area during the day, but weekends are way sketchy...", rating: 3, date: "2024-12-10" },
  { user: "Johnny W.", comment: "Felt very safe even when out late. Police presence is good but could be better.", rating: 5, date: "2025-01-01" },
  { user: "user795847", comment: "Some petty thefts reported. Good but not great", rating: 4, date: "2025-02-16" },
]

export default function ReviewList({ location }: { location: string }) {
  const [expanded, setExpanded] = useState(false)
  const [sort, setSort] = useState("recent")

  // sorting reviews
  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sort === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sort === "highest") return b.rating - a.rating
    if (sort === "lowest") return a.rating - b.rating
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-white/80 hover:text-white transition-colors"
        >
          <ChevronDown className={`h-5 w-5 mr-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide Reviews" : "Show Reviews"}
        </button>

        <select
          className="bg-black/30 text-white rounded px-2 py-1 text-sm border border-white/20"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {expanded && (
        <div className="mt-3 space-y-3">
          {sortedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-medium">{review.user}</span>
                <span className="text-sm text-blue-200">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star < review.rating ? "text-yellow-400" : "text-gray-600/30"
                    } fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-blue-100 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}