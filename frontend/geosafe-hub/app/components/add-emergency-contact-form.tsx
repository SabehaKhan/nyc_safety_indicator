"use client"

import type React from "react"

import { useState } from "react"
import { Phone, User, X, Check, ChevronDown } from "lucide-react"

interface AddEmergencyContactFormProps {
  onClose: () => void
  onSuccess?: () => void
}

export default function AddEmergencyContactForm({ onClose, onSuccess }: AddEmergencyContactFormProps) {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [carrier, setCarrier] = useState("")
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carriers = ["AT&T", "Verizon", "T-Mobile", "Sprint", "Other"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name.trim() || !phoneNumber.trim()) {
      setError("Name and phone number are required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would be an API call
      // await fetch('/api/emergency-contacts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, phoneNumber, carrier })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }

      // Close the form
      onClose()
    } catch (err) {
      setError("Failed to add emergency contact. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Add Emergency Contact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">{error}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 mb-1">
                Carrier (Optional)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                  className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span className="block truncate">{carrier || "Select carrier"}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </span>
                </button>

                {showCarrierDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {carriers.map((option) => (
                      <div
                        key={option}
                        className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                        onClick={() => {
                          setCarrier(option)
                          setShowCarrierDropdown(false)
                        }}
                      >
                        <span className={`block truncate ${carrier === option ? "font-medium" : "font-normal"}`}>
                          {option}
                        </span>
                        {carrier === option && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                            <Check className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
