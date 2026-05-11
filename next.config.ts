import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.redd.it" },
      { protocol: "https", hostname: "preview.redd.it" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.imgflip.com" },
      { protocol: "https", hostname: "imgflip.com" },
    ],
  },
};

export default nextConfig;
