import Image from "next/image"
import Link from "next/link"
import { MapPin, Shield } from "lucide-react"
import Footer from "./components/footer"
import AuthenticatedHeader from "./components/authenticated-header"
import { Suspense } from "react"
import TestimonialMarquee from "./components/testimonial-marquee"

// Dummy UserDashboardPreview component to resolve the error
function UserDashboardPreview() {
  return <div>{/* Placeholder for User Dashboard Preview */}</div>
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZriLYRX5gZ911BKSSH5C207I3WKmgR.png"
          alt="City at night"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Suspense fallback={null}>
          <AuthenticatedHeader />
        </Suspense>

        <main className="flex-1">
          <section className="container mx-auto px-4 py-12 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Know Your Neighborhood's Safety</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
              Explore safety information for any location. Make informed decisions about where to live, work, or visit.
            </p>

            <div className="max-w-3xl mx-auto mb-4 relative">
              <div className="flex">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full py-4 pl-12 pr-4 bg-white/10 backdrop-blur-md rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 border border-white/30"
                    placeholder="Search Any Location for Safety Information..."
                  />
                </div>
                <button className="px-8 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors">
                  Search
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-12">Try Search "Manhattan" or "Brooklyn"</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="border border-white/20 rounded-lg p-6 flex flex-col items-center bg-black/30 backdrop-blur-sm">
                <div className="mb-2">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Bronx</h3>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-lg">55 Safety Score</span>
                </div>
              </div>

              <div className="border border-white/20 rounded-lg p-6 flex flex-col items-center bg-black/30 backdrop-blur-sm">
                <div className="mb-2">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Manhattan</h3>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-lg">73 Safety Score</span>
                </div>
              </div>

              <div className="border border-white/20 rounded-lg p-6 flex flex-col items-center bg-black/30 backdrop-blur-sm">
                <div className="mb-2">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Queens</h3>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-lg">60 Safety Score</span>
                </div>
              </div>
            </div>

            {/* Features Section with adjusted styling for dark background */}
            <section className="max-w-6xl mx-auto mt-24 px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Explore Safety Information Your Way</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  GeoSafe Hub provides valuable safety insights whether you're a visitor or a registered user.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="rounded-xl p-8 border border-white/20 bg-black/30 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Without Signing In</h3>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Search any location for basic safety scores</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>View safety ratings for popular neighborhoods</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Access the interactive safety map</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Compare safety scores between different areas</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                      Try Now - No Login Required
                    </button>
                  </div>
                </div>

                <div className="rounded-xl p-8 border border-white/20 bg-black/30 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold">With an Account</h3>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>All features available to visitors</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Save favorite locations for quick access</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Receive safety alerts for your saved areas</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Access detailed safety reports and trends</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500 mr-3 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Create custom safety profiles for travel planning</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="/register"
                      className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      Create Free Account
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Make Informed Decisions Wherever You Go</h3>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                  Whether you're moving to a new city, planning a trip, or just exploring your options, GeoSafe Hub
                  gives you the safety information you need to make confident decisions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#features"
                    className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </section>

            {/* User Dashboard Section - Only visible when logged in */}
            <Suspense fallback={null}>
              <UserDashboardPreview />
            </Suspense>
          </section>
        </main>

        {/* Add the testimonial marquee before the footer */}
        <TestimonialMarquee />

        <Footer />
      </div>
    </div>
  )
}

