import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { cn } from "@/lib/util";

const array = localFont({
  src: [
    { path: "./fonts/Array-Semibold.woff2", weight: "600" },
    { path: "./fonts/Array-Bold.woff2", weight: "700" },
  ],
  variable: "--font-array",
  display: "swap",
});

const khand = localFont({
  src: "./fonts/Khand-Variable.ttf",
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
      <body className={cn("bg-caerula-180 text-white", GeistMono.className)}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
