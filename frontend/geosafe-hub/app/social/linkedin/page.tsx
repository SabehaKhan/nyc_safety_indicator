import Link from "next/link"
import Image from "next/image"
import Footer from "../../components/footer"

export default function LinkedinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold">GeoSafe Hub</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-6 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#0A66C2"
              className="mb-4"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-6">Connect with GeoSafe Hub on LinkedIn</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're redirecting you to our LinkedIn page where you can follow our company for professional updates,
            industry insights, and career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0A66C2] text-white rounded-full hover:bg-[#004182] transition-colors"
            >
              Continue to LinkedIn
            </a>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

