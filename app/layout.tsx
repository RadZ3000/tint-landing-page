import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: `${site.name} | Ceramic window tint in ${site.city}`,
  description: `Ceramic window tint in ${site.city}. $${site.offerPrice} for a sedan: four doors and the back window. Book online.`,
  openGraph: {
    title: `${site.name} | Ceramic window tint in ${site.city}`,
    description: `Ceramic window tint in ${site.city}. $${site.offerPrice} for a sedan: four doors and the back window. Book online.`,
    images: [{ url: site.logoLockup, width: 1600, height: 900, alt: site.name }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-black font-sans text-white">{children}</body>
    </html>
  );
}
