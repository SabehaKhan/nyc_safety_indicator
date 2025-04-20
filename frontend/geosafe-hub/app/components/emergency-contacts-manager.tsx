"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, Trash2, Plus, ChevronDown } from "lucide-react"
import AxiosInstance from "@/components/AxiosInstance"

interface EmergencyContact {
  id: number
  name: string
  phone_number: string
  carrier?: string
}

export default function EmergencyContactsManager() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [newContact, setNewContact] = useState({ name: "", phone_number: "", carrier: "" })
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false)
  const [formError, setFormError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const carriers = ["AT&T", "Verizon", "T-Mobile", "Sprint"]

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

  // Select carrier
  const selectCarrier = (carrier: string) => {
    setNewContact((prev) => ({ ...prev, carrier }))
    setShowCarrierDropdown(false)
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

      // Include carrier in the request if it's selected
      const contactData = {
        name: newContact.name,
        phone_number: newContact.phone_number,
        ...(newContact.carrier && { carrier: newContact.carrier }),
      }

      await AxiosInstance.post("/emergency/add/", contactData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })

      // Refresh the contacts list
      await fetchEmergencyContacts()

      // Reset form and close it
      setNewContact({ name: "", phone_number: "", carrier: "" })
      setShowAddForm(false)
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
    <div className="bg-gray-100 rounded-lg p-6 shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Emergency Contacts</h2>

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
          disabled={isLoading}
        >
          <Plus size={18} /> Add Emergency Contact
        </button>
      ) : (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add Emergency Contact</h3>

          {formError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">{formError}</div>
          )}

          <form onSubmit={handleAddContact}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Emergency Contact Name"
              />

              <input
                type="tel"
                name="phone_number"
                value={newContact.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Emergency Contact Phone"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md flex items-center justify-between"
                >
                  <span>{newContact.carrier || "Select Carrier"}</span>
                  <ChevronDown size={16} />
                </button>

                {showCarrierDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-600 border border-gray-700 rounded-md shadow-lg">
                    {carriers.map((carrier) => (
                      <div
                        key={carrier}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-500 ${
                          carrier === newContact.carrier ? "bg-blue-500" : ""
                        }`}
                        onClick={() => selectCarrier(carrier)}
                      >
                        {carrier === newContact.carrier && <span className="mr-2">✓</span>}
                        {carrier}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewContact({ name: "", phone_number: "", carrier: "" })
                    setFormError("")
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-4">Saved Emergency Contacts</h3>

      {isLoading && contacts.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <p>Loading emergency contacts...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          <p>No emergency contacts added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="font-medium">{contact.name}</h4>
                <div className="text-sm text-gray-600 flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {contact.phone_number}
                  {contact.carrier && <span className="ml-1">({contact.carrier})</span>}
                </div>
              </div>
              <button
                onClick={() => handleDeleteContact(contact.name, contact.phone_number)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                aria-label={`Delete ${contact.name}`}
                disabled={isLoading}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
