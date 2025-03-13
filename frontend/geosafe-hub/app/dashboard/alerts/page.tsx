"use client"

import { useState } from "react"
import { AlertTriangle, Bell, MapPin, Calendar, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

export default function SafetyAlerts() {
  const [filter, setFilter] = useState("all")

  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: "Crime",
      severity: "high",
      location: "Near Work",
      address: "456 Park Ave, Manhattan, NY 10022",
      date: "2023-05-15",
      time: "14:30",
      message: "Reported theft in the area. Multiple incidents of pickpocketing reported near the subway entrance.",
      read: true,
      dismissed: false,
    },
    {
      id: 2,
      type: "Traffic",
      severity: "medium",
      location: "Route to Work",
      address: "I-95 Northbound",
      date: "2023-05-15",
      time: "08:15",
      message: "Major accident on I-95 causing significant delays. Consider alternative routes for your commute.",
      read: false,
      dismissed: false,
    },
    {
      id: 3,
      type: "Weather",
      severity: "medium",
      location: "Brooklyn",
      address: "Brooklyn, NY",
      date: "2023-05-14",
      time: "16:45",
      message:
        "Flash flood warning in effect until 8 PM. Avoid low-lying areas and be prepared for possible street flooding.",
      read: true,
      dismissed: false,
    },
    {
      id: 4,
      type: "Crime",
      severity: "low",
      location: "Near Home",
      address: "123 Main St, Brooklyn, NY 11201",
      date: "2023-05-13",
      time: "23:10",
      message:
        "Increased reports of suspicious activity in the neighborhood. Residents advised to ensure doors and windows are secured.",
      read: true,
      dismissed: true,
    },
    {
      id: 5,
      type: "Public Safety",
      severity: "high",
      location: "City-wide",
      address: "New York, NY",
      date: "2023-05-12",
      time: "10:00",
      message:
        "Planned power outage scheduled for maintenance work. Expected to affect multiple neighborhoods from 1 AM to 5 AM tomorrow.",
      read: false,
      dismissed: false,
    },
  ]

  // Filter alerts based on selected filter
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return !alert.dismissed
    if (filter === "unread") return !alert.read && !alert.dismissed
    if (filter === "high") return alert.severity === "high" && !alert.dismissed
    if (filter === "dismissed") return alert.dismissed
    return true
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "Crime":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "Traffic":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "Weather":
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case "Public Safety":
        return <AlertCircle className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Safety Alerts</h1>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              filter === "all" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            All Active
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              filter === "unread" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              filter === "high" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            High Priority
          </button>
          <button
            onClick={() => setFilter("dismissed")}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              filter === "dismissed" ? "bg-blue-100 text-blue-700" : "bg-white text-gray-700 border border-gray-300"
            }`}
          >
            Dismissed
          </button>
        </div>
      </div>

      {/* Alerts Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Alerts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {alerts.filter((a) => !a.dismissed).length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unread Alerts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {alerts.filter((a) => !a.read && !a.dismissed).length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">High Priority</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {alerts.filter((a) => a.severity === "high" && !a.dismissed).length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Dismissed</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {alerts.filter((a) => a.dismissed).length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {filter === "all"
              ? "All Active Alerts"
              : filter === "unread"
                ? "Unread Alerts"
                : filter === "high"
                  ? "High Priority Alerts"
                  : "Dismissed Alerts"}
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <li
                key={alert.id}
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 ${!alert.read && !alert.dismissed ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">{getTypeIcon(alert.type)}</div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">{alert.type} Alert</h4>
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}
                          >
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </span>
                          {!alert.read && !alert.dismissed && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                      </div>
                      <div className="flex space-x-2">
                        {!alert.dismissed ? (
                          <>
                            <button className="text-gray-400 hover:text-blue-500">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button className="text-gray-400 hover:text-red-500">
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <button className="text-gray-400 hover:text-green-500">
                            <AlertCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>
                        {alert.location} - {alert.address}
                      </span>
                      <span className="mx-2">•</span>
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>{alert.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500">
              No alerts found. {filter === "all" ? "You're all caught up!" : "Try a different filter."}
            </li>
          )}
        </ul>
      </div>

      {/* Alert Settings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Settings</h2>
        <p className="text-sm text-gray-600 mb-4">
          Customize how you receive safety alerts and what types of alerts are important to you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">Alert Types</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="crime-alerts"
                  name="crime-alerts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="crime-alerts" className="ml-2 block text-sm text-gray-700">
                  Crime Alerts
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="traffic-alerts"
                  name="traffic-alerts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="traffic-alerts" className="ml-2 block text-sm text-gray-700">
                  Traffic Alerts
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="weather-alerts"
                  name="weather-alerts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="weather-alerts" className="ml-2 block text-sm text-gray-700">
                  Weather Alerts
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="public-safety"
                  name="public-safety"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="public-safety" className="ml-2 block text-sm text-gray-700">
                  Public Safety Announcements
                </label>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">Notification Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="email-notifications"
                  name="email-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-notifications"
                  name="push-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700">
                  Push Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sms-notifications"
                  name="sms-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                  SMS Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="high-priority-only"
                  name="high-priority-only"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="high-priority-only" className="ml-2 block text-sm text-gray-700">
                  High Priority Alerts Only
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

