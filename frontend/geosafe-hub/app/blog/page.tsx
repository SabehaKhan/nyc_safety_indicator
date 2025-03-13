import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Safety Scores: How We Calculate Neighborhood Safety",
      excerpt:
        "Learn about the methodology behind our safety scoring system and how we gather and analyze data to provide accurate safety information.",
      date: "May 15, 2023",
      author: "Dr. Sarah Johnson",
      category: "Safety Metrics",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Top 10 Safest Cities in America for 2023",
      excerpt:
        "Discover which American cities ranked highest in our comprehensive safety analysis, and what factors contribute to their exceptional safety records.",
      date: "April 28, 2023",
      author: "Michael Chen",
      category: "Rankings",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Safety Tips for Travelers: How to Research Your Destination",
      excerpt:
        "Planning a trip? Learn how to effectively research your destination's safety profile and prepare accordingly for a worry-free travel experience.",
      date: "April 10, 2023",
      author: "Emma Rodriguez",
      category: "Travel Safety",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "The Impact of Community Policing on Neighborhood Safety",
      excerpt:
        "An in-depth look at how community policing initiatives affect safety scores and quality of life in urban neighborhoods.",
      date: "March 22, 2023",
      author: "Officer James Wilson",
      category: "Community Safety",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Moving with Children: How to Prioritize Safety in Your Home Search",
      excerpt:
        "Special considerations for families with children when evaluating neighborhood safety and choosing a new place to live.",
      date: "March 5, 2023",
      author: "Lisa Thompson",
      category: "Family Safety",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-20">
            {/* Grid pattern overlay */}
            <div
              className="h-full w-full"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>
        </div>
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

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-center text-white">Safety Blog</h1>
          <p className="text-xl text-blue-100 mb-12 text-center max-w-3xl mx-auto">
            Expert insights, safety tips, and the latest research to help you stay informed and secure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium bg-blue-500/30 text-blue-100 rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-blue-200 ml-2">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white hover:text-blue-300 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-blue-100 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">By {post.author}</span>
                    <Link href={`/blog/${post.id}`} className="text-blue-300 hover:text-blue-100 text-sm font-medium">
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              Load More Articles
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

