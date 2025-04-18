"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Plus, User, Edit, Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Footer from "../components/footer"

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jane Doe", relationship: "Spouse", phone: "+1 (555) 987-6543" },
    { id: 2, name: "Michael Doe", relationship: "Brother", phone: "+1 (555) 456-7890" },
    { id: 3, name: "Sarah Johnson", relationship: "Friend", phone: "+1 (555) 234-5678" },
  ])

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
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Emergency Contacts</h1>
              <p className="text-blue-100 mt-2">People who will be notified in case of an emergency</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Contact
            </button>
          </div>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                    <div className="flex items-center text-blue-100">
                      <span className="mr-3">{contact.relationship}</span>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {contact.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Emergency Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Emergency (Police, Fire, Medical)</p>
                  <p className="text-blue-100">911</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Poison Control</p>
                  <p className="text-blue-100">1-800-222-1222</p>
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

