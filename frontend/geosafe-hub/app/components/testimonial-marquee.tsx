"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "New York Resident",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "GeoSafe Hub helped me find the safest neighborhood when I moved to a new city. The detailed safety scores and alerts are incredibly valuable.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Travel Blogger",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "As someone who travels frequently, I rely on GeoSafe Hub to research destinations before I visit. It's become an essential part of my travel planning.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Real Estate Agent",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    text: "I recommend GeoSafe Hub to all my clients. It provides the safety information they need when deciding where to purchase a home.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Parent of Three",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The safety alerts feature gives me peace of mind about my children's school and our neighborhood. Worth every penny of the premium subscription.",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "College Student",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "When I moved off-campus, GeoSafe Hub helped me find a safe apartment in an area with low crime rates. The mobile app is super intuitive!",
  },
  {
    id: 6,
    name: "Robert Thompson",
    role: "Business Traveler",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    text: "I travel for work constantly, and GeoSafe Hub has become my go-to resource for checking safety information in unfamiliar cities.",
  },
  {
    id: 7,
    name: "Lisa Garcia",
    role: "Safety Advocate",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "As someone passionate about community safety, I appreciate the detailed data and transparency that GeoSafe Hub provides. It empowers people to make informed decisions.",
  },
]

export default function TestimonialMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseEnter = () => {
      if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "paused"
    }

    const handleMouseLeave = () => {
      if (marqueeRef.current) marqueeRef.current.style.animationPlayState = "running"
    }

    const marquee = marqueeRef.current

    if (marquee) {
      marquee.addEventListener("mouseenter", handleMouseEnter)
      marquee.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (marquee) {
        marquee.removeEventListener("mouseenter", handleMouseEnter)
        marquee.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Thousands of people trust GeoSafe Hub for their safety information needs
        </p>
      </div>

      <div className="relative">
        {/* Single marquee row */}
        <div
          ref={marqueeRef}
          className="flex gap-4 animate-marquee"
          style={{
            animationDuration: "60s",
          }}
        >
          {/* Duplicate testimonials to create seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>
    </section>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm text-blue-200">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
          />
        ))}
      </div>
      <p className="text-blue-100">{testimonial.text}</p>
    </div>
  )
}

