import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahab Rizwan | AI-Powered Full Stack Developer",
  description:
    "Full Stack Developer specializing in AI, Web 3.0, and modern web technologies. Building intelligent applications with Next.js, FastAPI, and Claude AI.",
  keywords: [
    "Mahab Rizwan",
    "Full Stack Developer",
    "AI Developer",
    "Next.js",
    "FastAPI",
    "Web 3.0",
    "Karachi",
    "Pakistan",
  ],
  authors: [{ name: "Mahab Rizwan" }],
  creator: "Mahab Rizwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahabrizwan.com",
    title: "Mahab Rizwan | AI-Powered Full Stack Developer",
    description:
      "Full Stack Developer specializing in AI, Web 3.0, and modern web technologies.",
    siteName: "Mahab Rizwan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahab Rizwan - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahab Rizwan | AI-Powered Full Stack Developer",
    description:
      "Full Stack Developer specializing in AI, Web 3.0, and modern web technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LoadingScreen />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
