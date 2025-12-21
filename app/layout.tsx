import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PLCAutoPilot - AI-Powered PLC Programming Assistant",
  description: "Transform specifications into production-ready PLC code in minutes. AI-powered automation for Schneider Electric EcoStruxure platforms.",
  keywords: ["PLC programming", "ladder logic", "industrial automation", "Schneider Electric", "EcoStruxure", "AI automation"],
  authors: [{ name: "PLCAutoPilot" }],
  openGraph: {
    title: "PLCAutoPilot - AI-Powered PLC Programming Assistant",
    description: "Transform specifications into production-ready PLC code in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
