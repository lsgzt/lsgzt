import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lsgz.dev"),
  title: {
    default: "Lovepreet Singh — AI Product Builder",
    template: "%s · LSGZ",
  },
  description:
    "Lovepreet Singh (LSGZ) is an AI-focused developer transforming ideas into real products using modern web technologies, APIs, and artificial intelligence.",
  keywords: [
    "Lovepreet Singh",
    "LSGZ",
    "AI developer",
    "AI products",
    "machine learning",
    "Next.js",
    "developer portfolio",
    "AI startup",
  ],
  authors: [{ name: "Lovepreet Singh" }],
  creator: "Lovepreet Singh",
  icons: {
    // Favicon is always the white mark — it renders against the browser's
    // tab/chrome background (which varies), so we use the higher-contrast
    // white version regardless of site theme.
    icon: "/logo-white.png",
    apple: "/logo-white.png",
  },
  openGraph: {
    title: "Lovepreet Singh — Building AI products that people actually use",
    description:
      "AI-focused developer transforming ideas into real products using modern web technologies, APIs, and artificial intelligence.",
    url: "https://lsgz.dev",
    siteName: "LSGZ",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovepreet Singh — AI Product Builder",
    description:
      "AI-focused developer transforming ideas into real products using modern web technologies, APIs, and artificial intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
