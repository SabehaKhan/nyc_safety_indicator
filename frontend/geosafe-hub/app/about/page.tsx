import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function AboutPage() {
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

      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
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
            href="/signin"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
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

      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold mb-6 text-white">About Us</h1>
            <p className="text-xl text-blue-100 mb-8">
              This page is under construction. Check back soon for detailed information about GeoSafe Hub and our team.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
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

