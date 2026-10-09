import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Shubham Sinha | QA Automation Engineer & SDET",
  description:
    "Portfolio of Shubham Sinha, QA Automation Engineer and SDET building test automation and AI-assisted QA tooling.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
