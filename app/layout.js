// app/layout.js

import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";
import Toaster from "@/components/Toaster";
import DynamicFontLoader from "@/components/DynamicFontLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://rajivsharma.vercel.app"),
  title: "Rajiv Sharma | Software Developer Portfolio",
  description: "Portfolio of Rajiv Sharma, a Software Developer specializing in building robust, performant web applications leveraging React.js and Next.js, scalable client-side architectures, and REST API integration.",
  alternates: { canonical: "https://rajivsharma.vercel.app" },
  icons: { icon: "/favicon.ico" },
  keywords: ["Rajiv Sharma", "Software Developer", "Frontend Developer", "React Developer", "React.js Portfolio", "JavaScript Developer", "Next.js Developer", "Redux", "Tailwind CSS", "Web Developer India"],
  authors: [{ name: "Rajiv Sharma" }],

  openGraph: {
    title: "Rajiv Sharma | Software Developer",
    description: "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    url: "https://rajivsharma.vercel.app",
    siteName: "Rajiv Sharma Portfolio",
    type: "website",
    images: [{ url: "/profile.png", width: 1200, height: 630, alt: "Rajiv Sharma Software Developer Portfolio" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajiv Sharma | Software Developer",
    description: "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    images: ["/profile.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rajiv Sharma",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} ${plusJakarta.variable} font-sans antialiased bg-gray-50 dark:bg-neutral-950 dark:text-neutral-100 leading-relaxed transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <DynamicFontLoader />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
