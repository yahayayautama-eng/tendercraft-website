import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tendercrafthq.com"),
  title: {
    default: "Tendercraft — Product Studio for Business Software & Tools",
    template: "%s | Tendercraft",
  },
  description:
    "Tendercraft builds focused software that turns difficult workflows into useful products. Business software, browser tools, and continuous automation.",
  keywords: [
    "Tendercraft",
    "Product Studio",
    "Business Software",
    "Workflow Tools",
    "Browser Extensions",
    "Automation",
  ],
  authors: [{ name: "Tendercraft", url: "https://tendercrafthq.com" }],
  openGraph: {
    title: "Tendercraft — Product Studio",
    description:
      "Tendercraft builds focused software that turns difficult workflows into useful products.",
    url: "https://tendercrafthq.com",
    siteName: "Tendercraft",
    images: [
      {
        url: "/brand/tendercraft-og.png",
        width: 1200,
        height: 630,
        alt: "Tendercraft Product Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tendercraft — Product Studio",
    description:
      "Tendercraft builds focused software that turns difficult workflows into useful products.",
    images: ["/brand/tendercraft-og.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0B101D] dark:bg-[#0B0F19] dark:text-[#F8FAFC]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
