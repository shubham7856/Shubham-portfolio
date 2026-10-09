import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Sinha | QA Automation Engineer & SDET",
  description:
    "Portfolio of Shubham Sinha, QA Automation Engineer and SDET building test automation and AI-assisted QA tooling.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-900 text-slate-100">{children}</body>
    </html>
  );
}
