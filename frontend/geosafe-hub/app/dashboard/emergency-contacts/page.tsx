"use client"

import { useState } from "react"
import { Phone, Plus, User, Edit, Trash2 } from "lucide-react"

export default function EmergencyContactsDashboard() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jane Doe", relationship: "Spouse", phone: "+1 (555) 987-6543" },
    { id: 2, name: "Michael Doe", relationship: "Brother", phone: "+1 (555) 456-7890" },
    { id: 3, name: "Sarah Johnson", relationship: "Friend", phone: "+1 (555) 234-5678" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Emergency Contacts</h1>
        <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-5 w-5 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Your Emergency Contacts</h3>
          <p className="mt-1 text-sm text-gray-500">People who will be notified in case of an emergency.</p>
        </div>
        <ul className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <li key={contact.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{contact.name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-3">{contact.relationship}</span>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        {contact.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <p className="text-sm text-gray-500">
            Emergency contacts will be notified when you trigger an emergency alert or when a high-priority safety alert
            is issued for your location.
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Emergency Services</h3>
          <p className="mt-1 text-sm text-gray-500">Important emergency numbers to remember.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Emergency (Police, Fire, Medical)</p>
                <p className="text-gray-500">911</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Poison Control</p>
                <p className="text-gray-500">1-800-222-1222</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Non-Emergency Police</p>
                <p className="text-gray-500">311 or local department</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Crisis Hotline</p>
                <p className="text-gray-500">988</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}