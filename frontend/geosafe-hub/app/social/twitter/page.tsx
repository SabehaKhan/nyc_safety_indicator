import Link from "next/link"
import Image from "next/image"
import Footer from "../../components/footer"

export default function TwitterPage() {
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
              fill="#1DA1F2"
              className="mb-4"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-6">Follow GeoSafe Hub on Twitter</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're redirecting you to our Twitter page where you can follow us for real-time safety alerts, tips, and
            updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a94da] transition-colors"
            >
              Continue to Twitter
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

