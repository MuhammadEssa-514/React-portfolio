import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Fira_Code, Nunito, Roboto_Slab } from "next/font/google"; // Import 5 styles
import FloatingControls from "@/components/FloatingControls";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Essa | Frontend Web Developer",
  description: "Portfolio of Muhammad Essa, a Frontend Web Developer specializing in React, Next.js, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${firaCode.variable} ${nunito.variable} ${robotoSlab.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased"
      >

        {children}
        <FloatingControls />
        <ParticleBackground />
      </body>
    </html>
  );
}
