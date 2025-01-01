import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PDS_URL: process.env.PDS_URL!,
    ACCOUNT_DID: process.env.ACCOUNT_DID!,
  },
  images: {
    domains: ["fonts.gstatic.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pds.aparker.io",
      },
    ],
  },
};

export default nextConfig;
