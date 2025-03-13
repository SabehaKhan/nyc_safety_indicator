"use client"

import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function FAQPage() {
  const faqs = [
    {
      question: "How are safety scores calculated?",
      answer:
        "Our safety scores are calculated using a proprietary algorithm that analyzes multiple data points, including official crime statistics, public records, user reports, and information from local safety organizations. We consider factors such as crime rates, emergency response times, natural disaster risks, and community feedback to generate comprehensive safety profiles for each location.",
    },
    {
      question: "Is GeoSafe Hub available worldwide?",
      answer:
        "Currently, GeoSafe Hub provides comprehensive coverage for major cities and neighborhoods in the United States, Canada, and the United Kingdom. We're actively expanding our coverage to include more international locations. If your area isn't covered yet, you can request it through your account dashboard, and we'll prioritize adding it to our database.",
    },
    {
      question: "How often is the safety data updated?",
      answer:
        "We update our safety data regularly to ensure accuracy. Major cities and high-traffic areas receive updates monthly, while other locations are updated quarterly. Critical safety alerts and significant changes are updated in real-time whenever possible. The last update date is always displayed on each location's safety profile.",
    },
    {
      question: "Can I use GeoSafe Hub without creating an account?",
      answer:
        "Yes! You can search for locations and view basic safety scores without creating an account. However, creating a free account gives you access to additional features like saving favorite locations, receiving safety alerts, accessing detailed reports, creating custom safety profiles, and sharing information with others.",
    },
    {
      question: "How can I report inaccurate information?",
      answer:
        "We strive for accuracy in all our safety data. If you notice any information that seems incorrect, you can report it by clicking the 'Report Inaccuracy' button on any location's safety profile. Our team will review your report and update the information if necessary. Registered users can provide additional context and documentation to help us verify the correct information.",
    },
    {
      question: "Is my personal information safe with GeoSafe Hub?",
      answer:
        "Absolutely. We take data privacy very seriously. Your personal information is encrypted and stored securely. We never sell your data to third parties. You can review our complete Privacy Policy for detailed information about how we collect, use, and protect your data.",
    },
    {
      question: "Can I get safety alerts for my neighborhood?",
      answer:
        "Yes, registered users can set up safety alerts for any saved locations. You'll receive notifications about significant changes in safety scores, recent incidents, or emerging safety concerns in your selected areas. You can customize the types of alerts you receive and how you receive them (email, mobile notifications, etc.).",
    },
    {
      question: "Does GeoSafe Hub offer API access for developers?",
      answer:
        "Yes, we offer API access for developers who want to integrate our safety data into their applications. We have different API plans available depending on your needs and usage volume. Visit our Developer Portal for documentation and to request API access.",
    },
  ]

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

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-center text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 mb-12 text-center max-w-3xl mx-auto">
            Find answers to common questions about GeoSafe Hub and our safety information.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                  <p className="text-blue-100">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Still have questions?</h3>
              <p className="text-lg text-blue-100 mb-6">
                Our support team is here to help. Contact us and we'll get back to you as soon as possible.
              </p>
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors inline-block"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

