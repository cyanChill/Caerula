import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "@/assets/globals.css";
import { cn } from "@/lib/style";
import { JotaiProvider } from "@/lib/jotai";
import { Navbar } from "./_components/nav";
import Footer from "./_components/footer";
import { Polyfill } from "./_components/polyfill";

const array = localFont({
  src: [
    { path: "../assets/fonts/Array-Semibold.woff2", weight: "600" },
    { path: "../assets/fonts/Array-Bold.woff2", weight: "700" },
  ],
  variable: "--font-array",
  display: "swap",
});

const khand = localFont({
  src: "../assets/fonts/Khand-Variable.ttf",
  variable: "--font-khand",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#001F44",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://caerula.vercel.app"),
  title: {
    default: "Caerula",
    template: "%s | Caerula",
  },
  description: "Web interface for viewing information about Arknights.",
  keywords: "caerula, arknights",
  openGraph: {
    title: "Caerula",
    description: "Web interface for viewing information about Arknights.",
    url: "https://caerula.vercel.app",
    siteName: "Caerula",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Caerula",
    card: "summary_large_image",
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
      className={`${array.variable} ${GeistMono.variable} ${GeistSans.variable} ${khand.variable}`}
    >
      <body className={cn("bg-surface text-white", GeistMono.className)}>
        {/* 
          Making sure that if we forget to include a `<JotaiProvider />`
          on the individual `page.tsx`, we have a fallback provider to
          prevent global store from being shared between multiple requests
            - https://jotai.org/docs/guides/nextjs#provider
        */}
        <Polyfill />
        <JotaiProvider>
          <Navbar />
          {children}
        </JotaiProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
