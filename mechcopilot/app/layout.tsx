// import type { Metadata } from "next";
import { cn } from "../lib/utils"
import { Inter } from "next/font/google"
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`text-white bg-slate-900 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
