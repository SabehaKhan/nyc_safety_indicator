import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                alt="GeoSafe Hub Logo"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <span className="text-xl font-bold">GeoSafe Hub</span>
            </div>
            <p className="text-gray-400">
              Providing reliable safety information for neighborhoods worldwide. Make informed decisions about where to
              live, work, or visit.
            </p>
            <div className="flex space-x-4">
              <Link href="/social/facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="/social/twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="/social/instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="/social/linkedin" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 hover:text-white transition-colors">
                  Safety Map
                </Link>
              </li>
              <li>
                <Link href="/safety-profile" className="text-gray-400 hover:text-white transition-colors">
                  Safety Profiles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Safety Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Safety Street, Secure City, SC 10001, United States</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <Link href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <Link href="mailto:info@geosafehub.com" className="text-gray-400 hover:text-white transition-colors">
                  info@geosafehub.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for safety tips and updates.</p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} GeoSafe Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

