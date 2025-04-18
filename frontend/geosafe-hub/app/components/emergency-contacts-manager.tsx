"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, User, Trash2, Plus, AlertCircle } from "lucide-react"
import AxiosInstance from "@/components/AxiosInstance"

interface EmergencyContact {
  id: number
  name: string
  phone_number: string
}

export default function EmergencyContactsManager() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [newContact, setNewContact] = useState({ name: "", phone_number: "" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  // Load token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    setToken(storedToken)
  }, [])

  // Fetch contacts when token is available
  useEffect(() => {
    if (token) {
      fetchEmergencyContacts()
    }
  }, [token])

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        console.error("No refresh token found.")
        return null
      }

      const response = await AxiosInstance.post("/token/refresh/", {
        refresh: refreshToken,
      })

      localStorage.setItem("authToken", response.data.access)
      setToken(response.data.access)
      return response.data.access
    } catch (error) {
      console.error("Token refresh failed:", error)
      return null
    }
  }

  // Fetch emergency contacts from API
  const fetchEmergencyContacts = async () => {
    setIsLoading(true)
    try {
      let authToken = token
      if (!authToken) {
        console.warn("No access token found. Attempting to refresh...")
        authToken = await refreshAccessToken()
        if (!authToken) {
          console.error("Failed to refresh token. User needs to log in again.")
          setIsLoading(false)
          return
        }
      }

      const response = await AxiosInstance.get("/emergency/fetch/", {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      setContacts(response.data)
    } catch (error) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        fetchEmergencyContacts() // Retry fetching after refreshing
      } else {
        console.error(error)
        setFormError("Failed to load emergency contacts. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContact((prev) => ({ ...prev, [name]: value }))
  }

  // Add a new emergency contact
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    // Validate inputs
    if (!newContact.name.trim() || !newContact.phone_number.trim()) {
      setFormError("Please fill out both name and phone number")
      return
    }

    setIsLoading(true)
    try {
      let authToken = token
      if (!authToken) {
        authToken = await refreshAccessToken()
        if (!authToken) {
          setFormError("Session expired. Please log in again.")
          setIsLoading(false)
          return
        }
      }

      await AxiosInstance.post(
        "/emergency/add/",
        { name: newContact.name, phone_number: newContact.phone_number },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      )

      // Refresh the contacts list
      await fetchEmergencyContacts()

      // Reset form and close modal
      setNewContact({ name: "", phone_number: "" })
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error adding emergency contact:", error)
      setFormError("Failed to add emergency contact. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Delete an emergency contact
  const handleDeleteContact = async (name: string, phone_number: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return
    }

    setIsLoading(true)
    try {
      let authToken = token
      if (!authToken) {
        authToken = await refreshAccessToken()
        if (!authToken) {
          setFormError("Session expired. Please log in again.")
          setIsLoading(false)
          return
        }
      }

      await AxiosInstance.post(
        "/emergency/delete/",
        { name, phone_number },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      )

      // Refresh the contacts list
      await fetchEmergencyContacts()
    } catch (error) {
      console.error("Error deleting emergency contact:", error)
      setFormError("Failed to delete emergency contact. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Emergency Contacts</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          <Plus size={18} /> Add Contact
        </button>
      </div>

      {formError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{formError}</p>
        </div>
      )}

      {/* Modal for adding contacts */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Add Emergency Contact</h3>

            {formError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleAddContact}>
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newContact.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border border-white/30 text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-blue-100 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={newContact.phone_number}
                      onChange={handleInputChange}
                      className="bg-white/10 border border-white/30 text-white rounded-md block w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setNewContact({ name: "", phone_number: "" })
                    setFormError("")
                  }}
                  className="px-4 py-2 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {isLoading && contacts.length === 0 ? (
          <div className="text-center py-8 text-blue-100">
            <p>Loading emergency contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 text-blue-100">
            <p>No emergency contacts added yet.</p>
            <p className="text-sm mt-2">Add contacts who should be notified in case of emergency.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                  <div className="flex items-center text-blue-100">
                    <Phone className="h-4 w-4 mr-1" />
                    {contact.phone_number}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteContact(contact.name, contact.phone_number)}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label={`Delete ${contact.name}`}
                disabled={isLoading}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {contacts.length > 0 && (
        <div className="mt-6 text-sm text-blue-100">
          <p>These contacts will be notified in case of emergency.</p>
        </div>
      )}
    </div>
  )
}

