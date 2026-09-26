import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Toaster from "@/components/ui/Toaster";
import Cursor from "@/components/ui/Cursor";

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
  authors: [{ name: "Rajiv Sharma", url: "https://rajivsharma.vercel.app" }],
  alternates: {
    canonical: "https://rajivsharma.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rajiv Sharma | Software Developer & Frontend Engineer",
    description:
      "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    url: "https://rajivsharma.vercel.app",
    siteName: "Rajiv Sharma Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
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
    images: ["/og-image.webp"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
      <body className={`${outfit.variable} ${plusJakarta.variable} font-sans antialiased bg-gray-50 dark:bg-neutral-950 dark:text-neutral-100 leading-relaxed transition-colors duration-300`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Cursor />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
