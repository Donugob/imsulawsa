import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Move this to the top level (Fixes the first error)
  reactCompiler: true,

  // 2. Allow your local network IP (Fixes the Cross Origin warning)
  // devIndicators: {   // Note: In some versions it might be under devIndicators or similar, 
  //   appIsrStatus: false, // but for now assuming top level based on error message implicating 'experimental' was wrong 
  // },
  // Actually, wait, let's just move it to top level as valid NextConfig option if supported, 
  // OR check if it was truly experimental.
  // The error says "Unrecognized key(s) in object: 'allowedDevOrigins' at "experimental"".
  // This implies it's NOT in experimental. 
  // Let's try attempting to put it at the root if that's where it belongs in newer versions, 
  // BUT `allowedDevOrigins` is actually a specific config.
  // Let me double check the Next.js 16 docs or similar if I could, but I already searched.
  // The search result said "You can configure `allowedDevOrigins` in your `next.config.js` file." and didn't explicitly say "inside experimental".
  // Usually if it moves out of experimental, it goes to root.

  allowedDevOrigins: ["localhost:3000", "10.103.93.106:3000"],

  experimental: {
  },

  // 3. Image Whitelisting
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary
      },
    ],
  },
};

export default nextConfig;
