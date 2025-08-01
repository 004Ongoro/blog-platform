import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import CookieConsentModal from "@/components/cookie-consent/cookie-consent-modal"
import VercelAnalytics from "@/components/analytics/vercel-analytics"
import { Suspense } from "react"
import Script from "next/script" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "George Ongoro Blog",
    template: "%s | George Ongoro Blog",
  },
  description: "Personal blog by George Ongoro sharing insights on various topics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blog.ongoro.top"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <meta name="google-adsense-account" content="ca-pub-1908166869645479" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1908166869645479"
     crossorigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        {/* Gatekeeper Consent Scripts using next/script for better control */}
        <Script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false" strategy="beforeInteractive" />
        <Script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false" strategy="beforeInteractive" />

        {/* Ezoic Scripts using next/script */}
        <Script src="//www.ezojs.com/ezoic/sa.min.js" strategy="beforeInteractive" />
        <Script id="ezoic-cmd-init" strategy="beforeInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Suspense>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
          <Toaster />
          <CookieConsentModal />
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
