"use client"

import Link from "next/link"
import { useAuth } from "../context/auth-context"
import { MapPin, Shield, ArrowRight, AlertTriangle, TrendingUp } from "lucide-react"

export default function UserDashboardPreview() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  // Mock data for the dashboard preview
  const safetyScore = 78
  const savedLocations = [
    { id: 1, name: "Home", address: "123 Main St, Brooklyn, NY 11201", score: 82 },
    { id: 2, name: "Work", address: "456 Park Ave, Manhattan, NY 10022", score: 75 },
    { id: 3, name: "Gym", address: "789 Fitness Blvd, Queens, NY 11106", score: 68 },
  ]

  const recentAlerts = [
    { id: 1, type: "Crime", location: "Near Work", time: "2 hours ago", message: "Reported theft in the area" },
    { id: 2, type: "Traffic", location: "Route to Work", time: "5 hours ago", message: "Major accident on I-95" },
  ]

  return (
    <section className="max-w-6xl mx-auto mt-24 px-4 mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Your Safety Dashboard</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Welcome back! Here's a quick overview of your safety information.
        </p>
      </div>

      {/* Safety Score Card */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Your Overall Safety Score</h3>
            <p className="mt-1 text-sm text-gray-300">Based on your saved locations and preferences</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <Shield className="h-12 w-12 text-blue-400" />
              <div className="ml-4">
                <div className="text-4xl font-bold text-white">{safetyScore}</div>
                <div className="text-sm text-gray-300">out of 100</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
              <div
                style={{ width: `${safetyScore}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500/50 rounded-md p-3">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">Saved Locations</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-white">3</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500/50 rounded-md p-3">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">Active Alerts</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-white">2</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500/50 rounded-md p-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">Safety Trend</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-white">+5%</div>
                  <span className="ml-2 text-sm font-medium text-green-400">Improving</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Locations and Recent Alerts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Saved Locations */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
          <div className="px-4 py-5 border-b border-white/20 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-white">Saved Locations</h3>
              <Link href="/dashboard/saved-locations" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                View all
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-white/10">
            {savedLocations.map((location) => (
              <li key={location.id} className="px-4 py-4 sm:px-6 hover:bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{location.name}</p>
                      <p className="text-sm text-gray-400">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-blue-900/50 px-2.5 py-0.5 rounded-full">
                      <Shield className="h-4 w-4 text-blue-400 mr-1" />
                      <span className="text-sm font-medium text-blue-200">{location.score}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Alerts */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg">
          <div className="px-4 py-5 border-b border-white/20 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-white">Recent Alerts</h3>
              <Link href="/dashboard/alerts" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                View all
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-white/10">
            {recentAlerts.map((alert) => (
              <li key={alert.id} className="px-4 py-4 sm:px-6 hover:bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {alert.type} Alert - {alert.location}
                      </p>
                      <p className="text-sm text-gray-400">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400">{alert.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          Go to Full Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}

