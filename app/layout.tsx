import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kyoto Weekend Planner",
  description: "A conversational weekend planner for Kyoto.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="kyoto">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
