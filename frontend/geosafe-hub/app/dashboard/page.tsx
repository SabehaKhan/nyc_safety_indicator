"use client";

import Link from "next/link";
import {
  MapPin,
  Shield,
  AlertTriangle,
  TrendingUp,
  Bell,
  ArrowRight,
  Search,
  Phone,
} from "lucide-react";

export default function Dashboard() {
  const safetyTips = [
    {
      id: 1,
      title: "Stay aware of your surroundings",
      description:
        "Always be mindful of what's happening around you, especially in unfamiliar areas.",
    },
    {
      id: 2,
      title: "Keep emergency contacts updated",
      description:
        "Make sure your emergency contacts are current and easily accessible.",
    },
    {
      id: 3,
      title: "Plan your route ahead of time",
      description:
        "Research and plan your travel routes, especially when visiting new locations.",
    },
    {
      id: 4,
      title: "Avoid poorly lit areas at night",
      description:
        "Stick to well-lit and populated areas after dark to reduce risk.",
    },
    {
      id: 5,
      title: "Share your location with a trusted contact",
      description:
        "Use your phone to share your location with someone you trust when going out.",
    },
    {
      id: 6,
      title: "Trust your instincts",
      description:
        "If something feels off, remove yourself from the situation immediately.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 relative rounded-md shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search locations..."
          />
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Safety Tips
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => (
              <div
                key={tip.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              >
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {tip.title}
                </h4>
                <p className="text-sm text-gray-500">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="bg-white rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Emergency Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-100 bg-red-50 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">
                Emergency (Police, Fire, Medical)
              </p>
              <p className="text-2xl font-bold text-red-600">911</p>
            </div>
          </div>
          <div className="border border-red-100 bg-red-50 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-900 font-medium">Poison Control</p>
              <p className="text-2xl font-bold text-red-600">1-800-222-1222</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
