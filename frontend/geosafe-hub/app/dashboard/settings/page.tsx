"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff, Globe, Moon, Sun, Save, Smartphone, Mail, Shield } from "lucide-react"

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState("system")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Save className="h-5 w-5 mr-2" />
          Save All Changes
        </button>
      </div>

      {/* Account Settings */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
          <p className="mt-1 text-sm text-gray-500">Update your account details and password.</p>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  defaultValue="John"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  defaultValue="Doe"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="john.doe@example.com"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                Current password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="current-password"
                  id="current-password"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your current password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="new-password"
                  id="new-password"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm new password
              </label>
              <div className="mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
          <p className="mt-1 text-sm text-gray-500">Manage how and when you receive notifications.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-safety-alerts"
                      name="email-safety-alerts"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-safety-alerts" className="font-medium text-gray-700">
                      Safety Alerts
                    </label>
                    <p className="text-gray-500">
                      Receive email notifications for safety alerts in your saved locations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-account-updates"
                      name="email-account-updates"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-account-updates" className="font-medium text-gray-700">
                      Account Updates
                    </label>
                    <p className="text-gray-500">
                      Receive email notifications about your account status and security updates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-newsletters"
                      name="email-newsletters"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-newsletters" className="font-medium text-gray-700">
                      Newsletters and Tips
                    </label>
                    <p className="text-gray-500">Receive periodic newsletters with safety tips and feature updates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-safety-alerts"
                      name="push-safety-alerts"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-safety-alerts" className="font-medium text-gray-700">
                      Safety Alerts
                    </label>
                    <p className="text-gray-500">
                      Receive push notifications for safety alerts in your saved locations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="push-emergency-alerts"
                      name="push-emergency-alerts"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="push-emergency-alerts" className="font-medium text-gray-700">
                      Emergency Alerts
                    </label>
                    <p className="text-gray-500">
                      Receive immediate push notifications for high-priority emergency alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-emergency-alerts"
                      name="sms-emergency-alerts"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-emergency-alerts" className="font-medium text-gray-700">
                      Emergency Alerts Only
                    </label>
                    <p className="text-gray-500">Receive SMS notifications only for high-priority emergency alerts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance</h3>
          <p className="mt-1 text-sm text-gray-500">Customize how GeoSafe Hub looks for you.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <div className="mt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    theme === "light"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <Sun className="h-5 w-5 mr-2" />
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    theme === "dark"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <Moon className="h-5 w-5 mr-2" />
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    theme === "system"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700"
                  } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  <Globe className="h-5 w-5 mr-2" />
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Settings</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your privacy and data sharing preferences.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="location-tracking"
                  name="location-tracking"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="location-tracking" className="font-medium text-gray-700">
                  Location Tracking
                </label>
                <p className="text-gray-500">
                  Allow GeoSafe Hub to track your location to provide real-time safety alerts.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="data-collection"
                  name="data-collection"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="data-collection" className="font-medium text-gray-700">
                  Data Collection
                </label>
                <p className="text-gray-500">
                  Allow GeoSafe Hub to collect anonymous usage data to improve our services.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="third-party-sharing"
                  name="third-party-sharing"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="third-party-sharing" className="font-medium text-gray-700">
                  Third-Party Data Sharing
                </label>
                <p className="text-gray-500">Allow GeoSafe Hub to share your data with trusted third-party partners.</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Shield className="h-5 w-5 mr-2" />
              Download My Data
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Account Actions</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your account status.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Deactivate Account
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

