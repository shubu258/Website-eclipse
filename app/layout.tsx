import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import AnimatedFavicon from "@/components/AnimatedFavicon";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Eclipse",
    template: "%s | Eclipse",
  },
  description:
    "Eclipse is an AI-powered development partner for blockchain, AI, custom software and SaaS platforms. No hiring delays, no overheads.",
};

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {children}
        <AnimatedFavicon />
      </body>
    </html>
  );
}
