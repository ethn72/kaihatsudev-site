import type { NextConfig } from "next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// `ANALYZE=true npm run build` opens the bundle report.
const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
