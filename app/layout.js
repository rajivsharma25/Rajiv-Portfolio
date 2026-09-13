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
  title: {
    default: "Rajiv Sharma | Software Developer Portfolio",
    template: "%s | Rajiv Sharma",
  },
  description:
    "Portfolio of Rajiv Sharma, a Software Developer specializing in building robust, performant web applications leveraging React.js and Next.js, scalable client-side architectures, and REST API integration.",
  keywords: [
    "Rajiv Sharma",
    "Software Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "Web Developer India",
    "React.js Portfolio",
    "Full Stack Web Developer",
    "Freelance Web Developer",
    "Web Performance Optimization",
    "Core Web Vitals",
    "Redux Toolkit",
    "Tailwind CSS",
    "AI Web Integration",
    "Next.js 15 App Router",
  ],
  authors: [{ name: "Rajiv Sharma", url: "https://rajivsharma.vercel.app" }],
  creator: "Rajiv Sharma",
  publisher: "Rajiv Sharma",
  category: "technology",
  classification: "Software Engineering & Web Development Portfolio",

  alternates: {
    canonical: "https://rajivsharma.vercel.app",
    languages: {
      "en-US": "https://rajivsharma.vercel.app/?lang=en",
      "hi-IN": "https://rajivsharma.vercel.app/?lang=hi",
      "ar": "https://rajivsharma.vercel.app/?lang=ar",
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/profile.webp",
  },

  openGraph: {
    title: "Rajiv Sharma | Software Developer & Frontend Engineer",
    description:
      "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    url: "https://rajivsharma.vercel.app",
    siteName: "Rajiv Sharma Portfolio",
    locale: "en_US",
    alternateLocale: ["hi_IN", "ar_AR"],
    type: "website",
    images: [
      {
        url: "/profile.webp",
        width: 1200,
        height: 630,
        alt: "Rajiv Sharma Software Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajiv Sharma | Software Developer & Frontend Engineer",
    description:
      "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    creator: "@rajivsharma25",
    images: ["/profile.webp"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rajiv Sharma",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rajivsharma.vercel.app/#person",
      name: "Rajiv Sharma",
      url: "https://rajivsharma.vercel.app",
      image: "https://rajivsharma.vercel.app/profile.webp",
      jobTitle: "Software Developer",
      sameAs: [
        "https://github.com/rajivsharma25",
        "https://linkedin.com/in/rajivsharma25",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "JavaScript",
        "Frontend Architecture",
        "Web Performance",
        "Redux Toolkit",
        "Tailwind CSS",
        "REST APIs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rajivsharma.vercel.app/#website",
      url: "https://rajivsharma.vercel.app",
      name: "Rajiv Sharma Portfolio",
      description:
        "Portfolio of Rajiv Sharma, Software Developer specializing in React.js, Next.js, and modern frontend architecture.",
      publisher: {
        "@id": "https://rajivsharma.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
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
