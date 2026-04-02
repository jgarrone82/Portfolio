import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { JsonLd } from "@/src/components/ui/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jorgegarrone.com"),
  title: {
    default: "Jorge Ariel Garrone — Full Stack Engineer",
    template: "%s | Jorge Garrone",
  },
  description:
    "Senior Full Stack Engineer with 15+ years of experience building robust web applications, APIs, and leading high-performing development teams.",
  keywords: [
    "Full Stack Engineer",
    "Software Developer",
    "React",
    "Angular",
    ".NET",
    "Node.js",
    "TypeScript",
    "Barcelona",
  ],
  authors: [{ name: "Jorge Ariel Garrone" }],
  creator: "Jorge Ariel Garrone",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jorgegarrone.com",
    siteName: "Jorge Garrone Portfolio",
    title: "Jorge Ariel Garrone — Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 15+ years of experience building robust web applications, APIs, and leading high-performing development teams.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jorge Ariel Garrone — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Ariel Garrone — Full Stack Engineer",
    description:
      "Senior Full Stack Engineer with 15+ years of experience building robust web applications, APIs, and leading high-performing development teams.",
    creator: "@jorgegarrone",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.jorgegarrone.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-background text-text-primary">
        <JsonLd />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
