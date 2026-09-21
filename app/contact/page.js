import Contact from "@/components/sections/Contact";
import ContactHero from "@/components/contact/ContactHero";
import ContactServices from "@/components/contact/ContactServices";
import ContactProcess from "@/components/contact/ContactProcess";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact | Rajiv Sharma - Software Developer",
  description:
    "Get in touch with Rajiv Sharma for web development opportunities, engineering roles, freelance projects, and technical collaborations. Available for full-time and contract work.",
  alternates: {
    canonical: "https://rajivsharma.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Rajiv Sharma | Software Developer",
    description:
      "Get in touch with Rajiv Sharma for web development opportunities, engineering roles, freelance projects, and technical collaborations.",
    url: "https://rajivsharma.vercel.app/contact",
    siteName: "Rajiv Sharma Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Contact Rajiv Sharma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rajiv Sharma | Software Developer",
    description:
      "Get in touch with Rajiv Sharma for web development opportunities, engineering roles, and technical collaborations.",
    images: ["/og-image.webp"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Rajiv Sharma",
    description:
      "Contact page for Rajiv Sharma, Software Developer specializing in Next.js, React, Node.js, and modern web applications.",
    url: "https://rajivsharma.vercel.app/contact",
    mainEntity: {
      "@type": "Person",
      name: "Rajiv Sharma",
      jobTitle: "Software Developer",
      email: "rajivsharma93056@gmail.com",
      telephone: "+919305635022",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressCountry: "India",
      },
      sameAs: [
        "https://github.com/rajivsharma25",
        "https://linkedin.com/in/rajivsharma25",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-20 sm:pt-24 min-h-screen">
        <ContactHero />
        <Contact />
        <ContactServices />
        <ContactProcess />
        <ContactFAQ />
        <ContactCTA />
      </div>
    </>
  );
}
