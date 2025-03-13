import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
// Import the AuthProvider
import { AuthProvider } from "@/app/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GeoSafe Hub - Know Your Neighborhood's Safety",
  description:
    "Explore safety information for any location. Make informed decisions about where to live, work, or visit.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'