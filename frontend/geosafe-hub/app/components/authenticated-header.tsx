"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, User, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "../context/auth-context"

export default function AuthenticatedHeader() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // If not authenticated, show the regular header
  if (!isAuthenticated) {
    return (
      <header className="container mx-auto px-4 py-4 flex items-center justify-between bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </div>

        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <Link href="/features" className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Features
            </Link>
            <Link href="/map" className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Map
            </Link>
            <Link
              href="/safety-profile"
              className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Safety Profile
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              About
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Register
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="text-white h-6 w-6" />
        </button>
      </header>
    )
  }

  // Authenticated header
  return (
    <>
      <header className="container mx-auto px-4 py-4 flex items-center justify-between bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </div>

        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <Link href="/dashboard" className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/map" className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Safety Map
            </Link>
            <Link
              href="/dashboard/alerts"
              className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Alerts
            </Link>
            <Link
              href="/dashboard/saved-locations"
              className="px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Saved Locations
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative text-white hover:text-blue-300 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-black/30"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:inline">{user?.name}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setUserMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="text-white h-6 w-6" />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                  alt="GeoSafe Hub Logo"
                  width={30}
                  height={30}
                  className="rounded-xl"
                />
                <h2 className="text-xl font-bold">GeoSafe Hub</h2>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                href="/features"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/map"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Map
              </Link>
              <Link
                href="/safety-profile"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Safety Profile
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/map"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Safety Map
              </Link>
              <Link
                href="/dashboard/alerts"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Alerts
              </Link>
              <Link
                href="/dashboard/saved-locations"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Saved Locations
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-2 text-gray-500" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

