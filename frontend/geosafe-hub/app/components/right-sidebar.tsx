"use client"

import { X, Phone, BarChart2, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../context/auth-context"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <Link
            href="/emergency-contacts"
            className="flex items-center gap-3 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            onClick={onClose}
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">Emergency Contacts</span>
          </Link>

          <Link
            href="/safety-report"
            className="flex items-center gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            onClick={onClose}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="font-medium">Safety Report</span>
          </Link>

          {!isAuthenticated && (
            <>
              <div className="border-t my-4"></div>

              <Link
                href="/signin"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <LogIn className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Sign in</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                onClick={onClose}
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
