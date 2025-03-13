import Link from "next/link"
import Image from "next/image"
import Footer from "../../components/footer"

export default function FacebookPage() {
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
              fill="#1877F2"
              className="mb-4"
            >
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-6">Connect with GeoSafe Hub on Facebook</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're redirecting you to our Facebook page where you can follow us for safety tips, updates, and community
            discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-colors"
            >
              Continue to Facebook
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

