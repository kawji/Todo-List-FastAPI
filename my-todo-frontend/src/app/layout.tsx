import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import RootProvider from "./rootProveder";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaw - Todo List",
  description: "Todo List __ Kaw - Supavich",
    icons: {
    icon: "/favicon.png",
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
