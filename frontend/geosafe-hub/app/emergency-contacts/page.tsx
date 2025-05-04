"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Phone,
  ChevronDown,
  Check,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import Footer from "../components/footer";
import AxiosInstance from "@/components/AxiosInstance";

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone_number: "",
    carrier: "",
  });
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const carriers = ["AT&T", "Verizon", "T-Mobile", "Sprint", "Other"];

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) fetchEmergencyContacts();
  }, [token]);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;
      const response = await AxiosInstance.post("/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("authToken", response.data.access);
      setToken(response.data.access);
      return response.data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  };

  const fetchEmergencyContacts = async () => {
    try {
      let authToken = token || (await refreshAccessToken());
      if (!authToken) return;
      const res = await AxiosInstance.get("/emergency/fetch/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setContacts(res.data);
    } catch (err) {
      const newToken = await refreshAccessToken();
      if (newToken) fetchEmergencyContacts();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const { name, phone_number, carrier } = newContact;
    if (!name || !phone_number) {
      alert("Please fill out all required fields");
      return;
    }
    try {
      let authToken = token || (await refreshAccessToken());
      if (!authToken) return;

      await AxiosInstance.post(
        "/emergency/add/",
        {
          name,
          phone_number,
          carrier: carrier || "Not specified",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setNewContact({ name: "", phone_number: "", carrier: "" });
      fetchEmergencyContacts()
    } catch (err) {
      console.error("Failed to add contact", err);
    }
  };

  const handleDeleteContact = async (name: string, phone_number: string) => {
    try {
      let authToken = token || (await refreshAccessToken());
      if (!authToken) return;
      await AxiosInstance.post(
        "/emergency/delete/",
        { name, phone_number },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchEmergencyContacts();
      
    } catch (err) {
      console.error("Failed to delete contact", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
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
          <div className="bg-white rounded-xl p-8 shadow-xl mb-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              Emergency Contacts
            </h1>

            <h2 className="text-xl font-semibold mb-4">
              Add Emergency Contact
            </h2>
            <form onSubmit={handleAddContact} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                placeholder="Emergency Contact Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="tel"
                name="phone_number"
                value={newContact.phone_number}
                onChange={handleInputChange}
                placeholder="Emergency Contact Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between"
                >
                  <span className="text-gray-500">
                    {newContact.carrier || "Select Carrier"}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>

                {showCarrierDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                    {carriers.map((carrier) => (
                      <div
                        key={carrier}
                        className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center text-white"
                        onClick={() => {
                          setNewContact((prev) => ({ ...prev, carrier }));
                          setShowCarrierDropdown(false);
                        }}
                      >
                        {carrier === newContact.carrier && (
                          <Check className="h-4 w-4 text-blue-400 mr-2" />
                        )}
                        <span>{carrier}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Emergency Contact
              </button>
            </form>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Saved Emergency Contacts
            </h2>
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
                          <span>{contact.phone_number}</span>
                          {contact.carrier && (
                            <span className="ml-2">({contact.carrier})</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() =>
                          handleDeleteContact(
                            contact.name,
                            contact.phone_number
                          )
                        }
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No emergency contacts saved yet.
              </p>
            )}
          </div>

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
                  <p className="text-2xl font-bold text-red-600">
                    1-800-222-1222
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
