import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {/* Abstract pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
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
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Privacy Policy</h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-blue-200">Last Updated: May 1, 2023</p>

              <h2 className="text-white">Introduction</h2>
              <p className="text-blue-100">
                At GeoSafe Hub, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or use our services. Please read
                this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
                access the site.
              </p>

              <h2 className="text-white">Information We Collect</h2>
              <p className="text-blue-100">
                We collect information that you provide directly to us when you register for an account, create or
                modify your profile, set preferences, or make purchases through the site. This information may include:
              </p>
              <ul className="text-blue-100">
                <li>Name, email address, and phone number</li>
                <li>Username and password</li>
                <li>Profile information</li>
                <li>Payment information</li>
                <li>Location data</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h2 className="text-white">How We Use Your Information</h2>
              <p className="text-blue-100">
                We may use the information we collect about you for various purposes, including to:
              </p>
              <ul className="text-blue-100">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Personalize and improve the services</li>
                <li>Facilitate contests, sweepstakes, and promotions</li>
              </ul>

              <h2 className="text-white">Sharing of Information</h2>
              <p className="text-blue-100">We may share the information we collect about you as follows:</p>
              <ul className="text-blue-100">
                <li>
                  With vendors, consultants, and other service providers who need access to such information to carry
                  out work on our behalf
                </li>
                <li>
                  In response to a request for information if we believe disclosure is in accordance with any applicable
                  law, regulation, or legal process
                </li>
                <li>
                  If we believe your actions are inconsistent with our user agreements or policies, or to protect the
                  rights, property, and safety of GeoSafe Hub or others
                </li>
                <li>
                  In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business by another company
                </li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2 className="text-white">Data Security</h2>
              <p className="text-blue-100">
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
                access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we
                cannot guarantee the security of our systems.
              </p>

              <h2 className="text-white">Your Choices</h2>
              <p className="text-blue-100">
                You may update, correct, or delete information about you at any time by logging into your online
                account. If you wish to delete or deactivate your account, please email us at privacy@geosafehub.com,
                but note that we may retain certain information as required by law or for legitimate business purposes.
              </p>

              <h2 className="text-white">Changes to this Policy</h2>
              <p className="text-blue-100">
                We may change this privacy policy from time to time. If we make changes, we will notify you by revising
                the date at the top of the policy and, in some cases, we may provide you with additional notice.
              </p>

              <h2 className="text-white">Contact Us</h2>
              <p className="text-blue-100">
                If you have any questions about this privacy policy, please contact us at:
                <br />
                Email: privacy@geosafehub.com
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

