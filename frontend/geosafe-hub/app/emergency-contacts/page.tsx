"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone, ChevronDown, Check, Edit, Trash2, User } from "lucide-react"
import Footer from "../components/footer"

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jane Doe", phone: "+1 (555) 987-6543", carrier: "Verizon" },
    { id: 2, name: "Michael Doe", phone: "+1 (555) 456-7890", carrier: "AT&T" },
  ])

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    carrier: "",
  })

  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false)
  const [editingContact, setEditingContact] = useState(null)

  const carriers = ["AT&T", "Verizon", "T-Mobile", "Sprint", "Other"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddContact = (e) => {
    e.preventDefault()

    // Simple validation
    if (!newContact.name || !newContact.phone) {
      alert("Please fill out all required fields")
      return
    }

    // Create new contact
    const newContactEntry = {
      id: Date.now(),
      name: newContact.name,
      phone: newContact.phone,
      carrier: newContact.carrier || "Not specified",
    }

    // Add to contacts list
    setContacts([...contacts, newContactEntry])

    // Reset form
    setNewContact({ name: "", phone: "", carrier: "" })
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10 bg-blue-900/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Emergency Contacts Form */}
          <div className="bg-white rounded-xl p-8 shadow-xl mb-8">
            <h1 className="text-2xl font-bold text-center mb-6">Emergency Contacts</h1>

            <h2 className="text-xl font-semibold mb-4">Add Emergency Contact</h2>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  placeholder="Emergency Contact Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  placeholder="Emergency Contact Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-500">{newContact.carrier || "Select Carrier"}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>

                {showCarrierDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                    {carriers.map((carrier) => (
                      <div
                        key={carrier}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center text-white"
                        onClick={() => {
                          setNewContact((prev) => ({ ...prev, carrier }))
                          setShowCarrierDropdown(false)
                        }}
                      >
                        {carrier === newContact.carrier && <Check className="h-4 w-4 text-blue-400 mr-2" />}
                        <span>{carrier}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Emergency Contact
              </button>
            </form>

            <h2 className="text-xl font-semibold mt-8 mb-4">Saved Emergency Contacts</h2>
            {contacts.length > 0 ? (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{contact.phone}</span>
                          {contact.carrier && <span className="ml-2">({contact.carrier})</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-400 hover:text-blue-500"
                        onClick={() => {
                          setNewContact({
                            name: contact.name,
                            phone: contact.phone,
                            carrier: contact.carrier,
                          })
                          handleDeleteContact(contact.id)
                        }}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No emergency contacts saved yet.</p>
            )}
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
                  <p className="text-gray-900 font-medium">Emergency (Police, Fire, Medical)</p>
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
      </main>

      <Footer />
    </div>
  )
}
