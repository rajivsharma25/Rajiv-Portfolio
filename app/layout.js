import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rajiv Sharma | ReactJS Developer Portfolio",
  description: "Welcome to Rajiv Sharma's portfolio — ReactJS Developer specializing in modern web applications, React.js, Redux, and cloud technologies. Explore my projects including Forever Ecommerce, CraveCart Food Delivery, and Prescripto Doctor Appointments platform.",
  keywords: [
    "Rajiv Sharma",
    "ReactJS Developer",
    "Frontend Developer",
    "React.js Portfolio",
    "JavaScript Developer",
    "Next.js Developer",
    "AWS Cloud Practitioner",
    "Full Stack Developer",
    "Redux",
    "Tailwind CSS",
    "Web Development",
    "Noida Developer"
  ],
  authors: [{ name: "Rajiv Sharma" }],
  openGraph: {
    title: "Rajiv Sharma | ReactJS Developer Portfolio",
    description: "ReactJS Developer with expertise in modern web applications, cloud technologies, and responsive design.",
    url: "",
    siteName: "Rajiv Sharma Portfolio",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rajiv Sharma - ReactJS Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajiv Sharma | ReactJS Developer Portfolio",
    description: "ReactJS Developer with expertise in modern web applications, cloud technologies, and responsive design.",
    images: ["/profile.jpg"],
    creator: "@rajivsharma",
    site: "@rajivsharma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-outfit antialiased bg-gray-50 leading-relaxed`}>
        {children}
      </body>
    </html>
  );
}
