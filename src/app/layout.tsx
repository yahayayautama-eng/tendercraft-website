import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";
import { AmbientEffects } from "@/components/motion/AmbientEffects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const siteUrl = getSiteUrl();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tendercraft",
  url: siteUrl,
  logo: `${siteUrl}/brand/tendercraft-logo-light.svg`,
  image: `${siteUrl}/brand/tendercraft-og.png`,
  description:
    "Tendercraft builds focused software that turns difficult workflows into useful products. Business software, browser tools, and continuous automation.",
  email: "hello@tendercrafthq.com",
  founder: {
    "@type": "Person",
    name: "Yahaya Yautama",
    email: "yyautama@tendercrafthq.com",
  },
  sameAs: ["https://github.com/yahayayautama-eng/tendercraft-website"],
  knowsAbout: [
    "Business Software",
    "Workflow Tools",
    "Browser Extensions",
    "Process Automation",
    "Desktop Applications",
  ],
  areaServed: "Global",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F6F2' },
    { media: '(prefers-color-scheme: dark)', color: '#07070B' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          // Before first paint: flag JS for scroll reveals and apply the saved theme.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{if(localStorage.getItem('tc-theme')==='light'){document.documentElement.classList.remove('dark')}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "z2ykutmshc");`,
          }}
        />
      </head>
      <body className="grain min-h-full flex flex-col bg-ink text-[var(--foreground)]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AmbientEffects />
        <SmoothScroll />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
