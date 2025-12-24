import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {children}
        <FloatingControls />
        <ParticleBackground />
      </body>
    </html>
  );
}
