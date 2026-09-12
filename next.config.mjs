import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.js",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 240, 320],
    qualities: [75, 90],
  },
  compress: true,
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/si",
      "react-icons/fa",
      "react-icons/vsc",
      "lucide-react",
    ],
  },
};

export default withSerwist(nextConfig);
