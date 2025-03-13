import Link from "next/link"
import Image from "next/image"
import Footer from "../components/footer"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900">
          {/* Cookie pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-white/30"
                style={{
                  width: `${Math.random() * 30 + 20}px`,
                  height: `${Math.random() * 30 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                <div className="absolute inset-2 rounded-full bg-white/10"></div>
              </div>
            ))}
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
            <h1 className="text-4xl font-bold mb-8 text-center text-white">Cookie Policy</h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-blue-200">Last Updated: May 1, 2023</p>

              <h2 className="text-white">What Are Cookies</h2>
              <p className="text-blue-100">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, as
                well as to provide reporting information.
              </p>

              <h2 className="text-white">How We Use Cookies</h2>
              <p className="text-blue-100">
                GeoSafe Hub uses cookies for several reasons. Some cookies are required for technical reasons for our
                website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies
                enable us to track and target the interests of our users to enhance the experience on our website. Third
                parties may also serve cookies through our website for advertising, analytics, and other purposes.
              </p>

              <h2 className="text-white">Types of Cookies We Use</h2>
              <p className="text-blue-100">The types of cookies we use include:</p>
              <ul className="text-blue-100">
                <li>
                  <strong className="text-white">Essential cookies:</strong> These cookies are strictly necessary to
                  provide you with services available through our website and to use some of its features, such as
                  access to secure areas.
                </li>
                <li>
                  <strong className="text-white">Performance cookies:</strong> These cookies collect information about
                  how visitors use our website, for instance which pages visitors go to most often. We use this
                  information to improve our website.
                </li>
                <li>
                  <strong className="text-white">Functionality cookies:</strong> These cookies allow our website to
                  remember choices you make (such as your username, language, or the region you are in) and provide
                  enhanced, more personal features.
                </li>
                <li>
                  <strong className="text-white">Targeting cookies:</strong> These cookies record your visit to our
                  website, the pages you have visited, and the links you have followed. We may use this information to
                  make our website and the advertising displayed on it more relevant to your interests.
                </li>
              </ul>

              <h2 className="text-white">Third-Party Cookies</h2>
              <p className="text-blue-100">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                of the service, deliver advertisements on and through the service, and so on.
              </p>

              <h2 className="text-white">What Are Your Choices Regarding Cookies</h2>
              <p className="text-blue-100">
                If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit
                the help pages of your web browser.
              </p>
              <p className="text-blue-100">
                Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use
                all of the features we offer, you may not be able to store your preferences, and some of our pages might
                not display properly.
              </p>

              <h2 className="text-white">Where Can You Find More Information About Cookies</h2>
              <p className="text-blue-100">You can learn more about cookies at the following third-party websites:</p>
              <ul className="text-blue-100">
                <li>
                  AllAboutCookies:{" "}
                  <a href="http://www.allaboutcookies.org/" className="text-blue-300 hover:underline">
                    http://www.allaboutcookies.org/
                  </a>
                </li>
                <li>
                  Network Advertising Initiative:{" "}
                  <a href="http://www.networkadvertising.org/" className="text-blue-300 hover:underline">
                    http://www.networkadvertising.org/
                  </a>
                </li>
              </ul>

              <h2 className="text-white">Changes to Our Cookie Policy</h2>
              <p className="text-blue-100">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                Cookie Policy on this page and updating the "Last Updated" date at the top of this policy.
              </p>

              <h2 className="text-white">Contact Us</h2>
              <p className="text-blue-100">
                If you have any questions about our Cookie Policy, please contact us at:
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

