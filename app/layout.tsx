import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jonojivan.in"),
  title: {
    default: "Jonojivan — Loans Made Simple. Recharge Made Easy.",
    template: "%s | Jonojivan",
  },
  description:
    "Apply for personal and business loans, recharge your mobile and DTH, and pay electricity, broadband, FASTag, gas, water and other bills from one simple platform.",
  applicationName: "Jonojivan",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Jonojivan",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#2549e0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
