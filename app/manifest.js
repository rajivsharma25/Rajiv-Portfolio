export default function manifest() {
  return {
    name: "Rajiv Sharma | Software Developer Portfolio",
    short_name: "Rajiv Sharma",
    description:
      "Software Developer specializing in building robust, performant web applications leveraging React.js, Next.js, and modern client-side architectures.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
