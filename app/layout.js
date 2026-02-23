// app/layout.js

import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://rajivsharma.vercel.app"),

  title: "Rajiv Sharma | Frontend Developer Portfolio",
  description:
    "Portfolio of Rajiv Sharma, a Frontend Developer skilled in building modern, responsive web applications using React.js, Next.js, Redux, and Tailwind CSS.",

  viewport: "width=device-width, initial-scale=1",

  alternates: {
    canonical: "https://rajivsharma.vercel.app",
  },

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Rajiv Sharma",
    "React Developer",
    "Frontend Developer",
    "React.js Portfolio",
    "JavaScript Developer",
    "Next.js Developer",
    "Redux",
    "Tailwind CSS",
    "Web Developer India",
  ],

  authors: [{ name: "Rajiv Sharma" }],

  openGraph: {
    title: "Rajiv Sharma | Frontend Developer",
    description:
      "Frontend Developer building modern, performant, and user-friendly web applications.",
    url: "https://rajivsharma.vercel.app",
    siteName: "Rajiv Sharma Portfolio",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rajiv Sharma Frontend Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajiv Sharma | Frontend Developer",
    description:
      "Frontend Developer focused on building clean and scalable frontend applications.",
    images: ["/profile.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent Light → Dark Flash */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body
        className={`
          ${outfit.variable} 
          font-outfit 
          antialiased 
          bg-gray-50 
          dark:bg-gray-900 
          dark:text-gray-100 
          leading-relaxed 
          transition-colors 
          duration-300
        `}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}