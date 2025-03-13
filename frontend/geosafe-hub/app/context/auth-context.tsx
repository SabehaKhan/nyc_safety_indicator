"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, this would check for a token in localStorage or cookies
    // and validate it with the server
    const checkAuth = () => {
      const savedUser = localStorage.getItem("geosafe_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Update the login function to use the actual email and generate a more personalized name

  // Replace the login function with:
  const login = async (email: string, password: string, name?: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Use the provided name or generate one from the email
    const displayName = name || email.split("@")[0]

    // Create user data with the provided information
    const userData: User = {
      id: "1",
      name: displayName,
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    // Save to localStorage (in a real app, you'd store a token)
    localStorage.setItem("geosafe_user", JSON.stringify(userData))
    setUser(userData)
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("geosafe_user")
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

