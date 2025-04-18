"use client"

import { useState, useEffect } from "react"
import { AlertCircle, ExternalLink, RefreshCw } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  source: string
  url: string
  date: string
}

export default function NewsHeadlines() {
  const [headlines, setHeadlines] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data - in a real app, this would come from an API
  const mockHeadlines: NewsItem[] = [
    {
      id: 1,
      title: "NYPD Reports 12% Decrease in Crime Rates Across Manhattan",
      source: "NYC News",
      url: "#",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "New Safety Measures Implemented in Brooklyn Neighborhoods",
      source: "Safety Today",
      url: "#",
      date: "5 hours ago",
    },
    {
      id: 3,
      title: "City Council Approves Funding for Additional Street Lighting in Queens",
      source: "City Updates",
      url: "#",
      date: "Yesterday",
    },
  ]

  // Simulate fetching headlines
  useEffect(() => {
    const fetchHeadlines = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/news-headlines')
        // const data = await response.json()

        // Using mock data for demonstration
        setTimeout(() => {
          setHeadlines(mockHeadlines)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to load safety news. Please try again.")
        setLoading(false)
      }
    }

    fetchHeadlines()
  }, [])

  const refreshHeadlines = () => {
    setLoading(true)
    setError(null)

    // Simulate refreshing data
    setTimeout(() => {
      setHeadlines(mockHeadlines)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg max-w-md mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-lg font-bold text-white">Latest Safety News</h3>
        </div>
        <button
          onClick={refreshHeadlines}
          disabled={loading}
          className="p-1 text-white/70 hover:text-white transition-colors rounded-full"
          aria-label="Refresh headlines"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {error ? (
        <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm">{error}</div>
      ) : loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {headlines.map((headline) => (
            <a
              key={headline.id}
              href={headline.url}
              className="block bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-white font-medium text-sm mb-1">{headline.title}</h4>
                <ExternalLink className="h-3 w-3 text-blue-300 flex-shrink-0 mt-1 ml-2" />
              </div>
              <div className="flex justify-between text-xs text-blue-200">
                <span>{headline.source}</span>
                <span>{headline.date}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
