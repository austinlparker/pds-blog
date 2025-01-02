import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PDS_URL: process.env.PDS_URL!,
    ACCOUNT_DID: process.env.ACCOUNT_DID!,
    PURGE_PASSWORD: process.env.PURGE_PASSWORD!,
  },
  images: {
    domains: ["fonts.gstatic.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pds.aparker.io",
      },
      {
        protocol: "https",
        hostname: "pfmksuq9g71x0dz6.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
