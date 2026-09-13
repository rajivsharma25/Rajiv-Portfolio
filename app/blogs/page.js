import { getAllBlogs, getAllCategories } from "@/lib/blogs";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Blogs & Engineering Insights | Rajiv Sharma",
  description:
    "Explore in-depth technical writeups on React 19, Next.js 15, frontend architecture, Core Web Vitals optimization, and state management by Rajiv Sharma.",
  alternates: {
    canonical: "https://rajivsharma.vercel.app/blogs",
  },
  keywords: [
    "Rajiv Sharma Blog",
    "Frontend Engineering Blog",
    "Next.js 15 Tutorials",
    "React 19 Server Components",
    "Web Performance Optimization",
    "Core Web Vitals",
    "Software Developer India",
  ],
  openGraph: {
    title: "Blogs & Technical Insights | Rajiv Sharma",
    description:
      "Articles and deep dives on React 19, Next.js 15, Core Web Vitals, and scalable frontend architectures by Rajiv Sharma.",
    url: "https://rajivsharma.vercel.app/blogs",
    siteName: "Rajiv Sharma Portfolio",
    type: "website",
    images: [
      {
        url: "/profile.webp",
        width: 1200,
        height: 630,
        alt: "Rajiv Sharma Engineering Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Technical Insights | Rajiv Sharma",
    description:
      "Articles and deep dives on React 19, Next.js 15, Core Web Vitals, and scalable frontend architectures by Rajiv Sharma.",
    images: ["/profile.webp"],
  },
};

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const categories = getAllCategories();

  // Schema.org Blog/CollectionPage structured data for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rajiv Sharma Engineering Blogs",
    description:
      "Technical articles on React 19, Next.js 15, web performance, and scalable frontend architectures.",
    url: "https://rajivsharma.vercel.app/blogs",
    author: {
      "@type": "Person",
      name: "Rajiv Sharma",
      url: "https://rajivsharma.vercel.app",
      jobTitle: "Software Developer",
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `https://rajivsharma.vercel.app/blogs/${blog.slug}`,
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt,
      author: {
        "@type": "Person",
        name: blog.author.name,
      },
      keywords: blog.tags.join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogListClient blogs={blogs} categories={categories} />
    </>
  );
}
