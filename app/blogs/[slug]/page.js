import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import ArticleClient from "@/components/blog/ArticleClient";

export const dynamic = "force-dynamic";

/**
 * Dynamic SEO metadata generation for each individual blog post.
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found | Rajiv Sharma",
      description: "The requested technical article could not be found.",
    };
  }

  const siteUrl = "https://rajivsharma.vercel.app";
  const articleUrl = `${siteUrl}/blogs/${blog.slug}`;
  const keywords = blog.seo?.keywords || blog.tags || [];
  const authorName = blog.author?.name || "Rajiv Sharma";
  const ogImage = `${siteUrl}/profile.webp`;

  return {
    title: `${blog.title} | Rajiv Sharma`,
    description: blog.description,
    keywords: Array.isArray(keywords) ? keywords : [keywords],
    alternates: {
      canonical: blog.seo?.canonical || articleUrl,
    },
    authors: [{ name: authorName, url: siteUrl }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: articleUrl,
      siteName: "Rajiv Sharma Portfolio",
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt || blog.publishedAt,
      authors: [authorName],
      tags: blog.tags || [],
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.slug, 2);
  const siteUrl = "https://rajivsharma.vercel.app";
  const articleUrl = `${siteUrl}/blogs/${blog.slug}`;
  const authorName = blog.author?.name || "Rajiv Sharma";
  const authorRole = blog.author?.role || "Software Developer";

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
      name: authorName,
      jobTitle: authorRole,
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
    keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
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
