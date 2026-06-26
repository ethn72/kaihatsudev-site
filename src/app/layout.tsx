import type { Metadata, Viewport } from "next";
import { Syne, Inter, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne-src",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter-src",
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-src",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Kaihatsu Dev | Web Development Studio Malaysia",
    template: "%s | Kaihatsu Dev",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Ethan" }],
  creator: "Ethan",
  keywords: [
    "web developer Malaysia",
    "web development Malaysia",
    "freelance web developer Malaysia",
    "website design Malaysia",
    "web developer Selangor",
    "hire web developer Malaysia",
    "web development studio Malaysia",
    "React developer Malaysia",
    "Next.js developer Malaysia",
    "website maintenance Malaysia",
  ],
  alternates: {
    canonical: SITE.domain,
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE.domain,
    siteName: SITE.name,
    title: "Kaihatsu Dev | Web Development Studio Malaysia",
    description: SITE.description,
    // og:image is supplied by app/opengraph-image.tsx (file convention).
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaihatsu Dev | Web Development Studio Malaysia",
    description: SITE.description,
    // twitter:image is supplied by app/opengraph-image.tsx (file convention).
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0D0D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${notoSerifJp.variable}`}
    >
      <head>
        <link rel="preconnect" href={SITE.backendUrl} />
      </head>
      <body className="bg-sumi text-washi font-inter antialiased">
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
