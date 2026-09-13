import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import ArticleClient from "./ArticleClient";

/**
 * Generate static params for all blogs to ensure instant static rendering.
 */
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/**
 * Dynamic SEO metadata generation for each individual blog post.
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found | Rajiv Sharma",
      description: "The requested technical article could not be found.",
    };
  }

  const siteUrl = "https://rajivsharma.vercel.app";
  const articleUrl = `${siteUrl}/blogs/${blog.slug}`;

  return {
    title: `${blog.title} | Rajiv Sharma`,
    description: blog.description,
    keywords: blog.seo.keywords,
    alternates: {
      canonical: blog.seo.canonical || articleUrl,
    },
    authors: [{ name: blog.author.name, url: siteUrl }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: articleUrl,
      siteName: "Rajiv Sharma Portfolio",
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt || blog.publishedAt,
      authors: [blog.author.name],
      tags: blog.tags,
      images: [
        {
          url: "/profile.webp",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ["/profile.webp"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 2);
  const siteUrl = "https://rajivsharma.vercel.app";
  const articleUrl = `${siteUrl}/blogs/${blog.slug}`;

  // Article / BlogPosting Structured Data for Google Rich Snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: [`${siteUrl}/profile.webp`],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
      jobTitle: blog.author.role,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Rajiv Sharma",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: blog.tags.join(", "),
    articleSection: blog.category,
  };

  // Breadcrumb List Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleClient blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
