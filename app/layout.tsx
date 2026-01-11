import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Tapzam  - App on Google Play",
  description: "Tapzam is a next-generation photo contest platform where creativity meets competition. Upload your best photos, join live contests, collect likes, and climb the leaderboard in real time. Designed for creators, students, and everyday users, Tapzam offers fast-paced contests, fair rankings, and instant engagement — all in one simple app. Whether you love photography or just enjoy fun competitions, Tapzam gives every photo a chance to shine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
