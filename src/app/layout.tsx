import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ledger",
  description: "Made by nsvoriginals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"  className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161B19]`}>
        
      <Navbar/>
      <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
