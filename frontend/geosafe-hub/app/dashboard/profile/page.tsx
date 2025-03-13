"use client"

import { useState } from "react"
import { User, Shield, MapPin, Phone, Mail, Edit, Save, X } from "lucide-react"

export default function SafetyProfile() {
  const [editing, setEditing] = useState(false)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Brooklyn, NY 11201",
    emergencyContacts: [
      { id: 1, name: "Jane Doe", relationship: "Spouse", phone: "+1 (555) 987-6543" },
      { id: 2, name: "Michael Doe", relationship: "Brother", phone: "+1 (555) 456-7890" },
    ],
    safetyPreferences: {
      notifyEmergencyContacts: true,
      shareLocationWithContacts: false,
      autoCheckIn: true,
      safetyRadius: "5 miles",
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Safety Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {editing ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Cancel Editing
            </>
          ) : (
            <>
              <Edit className="h-5 w-5 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your personal information is used to provide you with personalized safety alerts and recommendations.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User className="h-16 w-16 text-gray-500" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-500">Member since May 2023</p>
              </div>
            </div>
            <div className="sm:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={user.name}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="mt-1 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  {editing ? (
                    <input
                      type="email"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={user.email}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{user.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="mt-1 flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  {editing ? (
                    <input
                      type="tel"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={user.phone}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{user.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Home Address</label>
                <div className="mt-1 flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  {editing ? (
                    <input
                      type="text"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      defaultValue={user.address}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{user.address}</p>
                  )}
                </div>
              </div>
              {editing && (
                <div className="pt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Contacts</h3>
              <p className="mt-1 text-sm text-gray-500">People who will be notified in case of an emergency.</p>
            </div>
            {editing && (
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add Contact
              </button>
            )}
          </div>
        </div>
        <ul className="divide-y divide-gray-200">
          {user.emergencyContacts.map((contact) => (
            <li key={contact.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                      <span className="mx-2 text-gray-500">•</span>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                </div>
                {editing && (
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-500">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety Preferences */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Safety Preferences</h3>
          <p className="mt-1 text-sm text-gray-500">Customize your safety settings and notification preferences.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notify-emergency-contacts"
                  name="notify-emergency-contacts"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={user.safetyPreferences.notifyEmergencyContacts}
                  disabled={!editing}
                  onChange={() => {}}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify-emergency-contacts" className="font-medium text-gray-700">
                  Notify emergency contacts in case of alerts
                </label>
                <p className="text-gray-500">
                  Your emergency contacts will be notified when high-priority safety alerts are issued for your saved
                  locations.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="share-location"
                  name="share-location"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={user.safetyPreferences.shareLocationWithContacts}
                  disabled={!editing}
                  onChange={() => {}}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="share-location" className="font-medium text-gray-700">
                  Share my location with emergency contacts
                </label>
                <p className="text-gray-500">
                  Your emergency contacts will be able to see your real-time location when you enable this feature.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="auto-check-in"
                  name="auto-check-in"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={user.safetyPreferences.autoCheckIn}
                  disabled={!editing}
                  onChange={() => {}}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="auto-check-in" className="font-medium text-gray-700">
                  Enable automatic check-ins
                </label>
                <p className="text-gray-500">
                  Automatically check in when you arrive at or leave your saved locations.
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="safety-radius" className="block text-sm font-medium text-gray-700">
                Safety Alert Radius
              </label>
              {editing ? (
                <select
                  id="safety-radius"
                  name="safety-radius"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue={user.safetyPreferences.safetyRadius}
                >
                  <option>1 mile</option>
                  <option>2 miles</option>
                  <option>5 miles</option>
                  <option>10 miles</option>
                  <option>25 miles</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user.safetyPreferences.safetyRadius}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Receive alerts for incidents within this radius of your saved locations.
              </p>
            </div>
          </div>
          {editing && (
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Save className="h-5 w-5 mr-2" />
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Safety Score */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Your Personal Safety Score</h2>
              <p className="mt-1 text-sm text-gray-500">Based on your saved locations and safety settings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <Shield className="h-12 w-12 text-blue-500" />
                <div className="ml-4">
                  <div className="text-4xl font-bold text-gray-900">78</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: "78%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">How to improve your safety score:</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
              <li>Add more emergency contacts</li>
              <li>Enable automatic check-ins</li>
              <li>Complete your safety profile</li>
              <li>Review safety tips regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

