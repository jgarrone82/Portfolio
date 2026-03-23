import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images in /public are served directly by Next.js — no domain config needed.
    // Add remote domains here if you later load images from external URLs, e.g.:
    // remotePatterns: [
    //   { protocol: "https", hostname: "example.com" },
    // ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
