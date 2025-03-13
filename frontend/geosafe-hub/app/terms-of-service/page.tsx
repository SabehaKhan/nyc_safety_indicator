import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="white" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="3" fill="white" />
                  <circle cx="0" cy="50" r="3" fill="white" />
                  <circle cx="100" cy="50" r="3" fill="white" />
                  <circle cx="50" cy="0" r="3" fill="white" />
                  <circle cx="50" cy="100" r="3" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
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
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Terms of Service</h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-blue-200">Last Updated: May 1, 2023</p>

              <h2 className="text-white">1. Acceptance of Terms</h2>
              <p className="text-blue-100">
                By accessing or using GeoSafe Hub's website, mobile applications, or any other services provided by
                GeoSafe Hub (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do
                not agree to these terms, please do not use our Services.
              </p>

              <h2 className="text-white">2. Description of Services</h2>
              <p className="text-blue-100">
                GeoSafe Hub provides information about neighborhood safety, crime statistics, and related data to help
                users make informed decisions about where to live, work, or visit. While we strive for accuracy, we
                cannot guarantee that all information is complete, accurate, or up-to-date.
              </p>

              <h2 className="text-white">3. User Accounts</h2>
              <p className="text-blue-100">
                Some features of our Services require you to create an account. You are responsible for maintaining the
                confidentiality of your account information and for all activities that occur under your account. You
                agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-white">4. User Content</h2>
              <p className="text-blue-100">
                Our Services may allow you to post, submit, or transmit content. By providing content to our Services,
                you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish,
                translate, distribute, and display such content.
              </p>
              <p className="text-blue-100">
                You agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory,
                vulgar, obscene, or otherwise objectionable. We reserve the right to remove any content that violates
                these terms or that we find objectionable for any reason.
              </p>

              <h2 className="text-white">5. Intellectual Property</h2>
              <p className="text-blue-100">
                The Services and all content and materials included on the Services, including, but not limited to,
                text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and
                software, are the property of GeoSafe Hub or its licensors and are protected by copyright, trademark,
                and other intellectual property laws.
              </p>

              <h2 className="text-white">6. Disclaimer of Warranties</h2>
              <p className="text-blue-100">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2 className="text-white">7. Limitation of Liability</h2>
              <p className="text-blue-100">
                IN NO EVENT SHALL GEOSAFE HUB BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
                INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
              </p>

              <h2 className="text-white">8. Indemnification</h2>
              <p className="text-blue-100">
                You agree to defend, indemnify, and hold harmless GeoSafe Hub and its officers, directors, employees,
                and agents from and against any claims, liabilities, damages, losses, and expenses, including, without
                limitation, reasonable legal and accounting fees, arising out of or in any way connected with your
                access to or use of the Services or your violation of these Terms of Service.
              </p>

              <h2 className="text-white">9. Termination</h2>
              <p className="text-blue-100">
                We may terminate or suspend your account and access to the Services immediately, without prior notice or
                liability, for any reason whatsoever, including, without limitation, if you breach these Terms of
                Service.
              </p>

              <h2 className="text-white">10. Changes to Terms</h2>
              <p className="text-blue-100">
                We reserve the right to modify these Terms of Service at any time. If we make changes, we will provide
                notice by revising the date at the top of these terms and, in some cases, we may provide additional
                notice. Your continued use of the Services after such changes constitutes your acceptance of the new
                terms.
              </p>

              <h2 className="text-white">11. Governing Law</h2>
              <p className="text-blue-100">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United
                States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-white">12. Contact Information</h2>
              <p className="text-blue-100">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@geosafehub.com
                <br />
                Address: 123 Safety Street, Secure City, SC 10001, United States
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

