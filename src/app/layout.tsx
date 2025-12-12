// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Load Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // This matches the CSS var(--font-inter)
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // This matches the CSS var(--font-playfair)
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAWSA IMSU",
  description: "Official Website of Law Students Association, IMSU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-white text-black antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
