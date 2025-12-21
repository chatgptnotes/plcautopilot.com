import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Material Icons will be loaded via CDN in the head

export const metadata: Metadata = {
  title: "PLCAutoPilot - AI-Powered PLC Programming Assistant",
  description: "Transform specifications into production-ready PLC code in minutes. AI-powered automation for Schneider Electric EcoStruxure platforms. Founded by Saikat Dutta, powered by Dr.M Hope Softwares.",
  keywords: ["PLC programming", "ladder logic", "industrial automation", "Schneider Electric", "EcoStruxure", "AI automation", "Saikat Dutta", "Shivalay Engineering"],
  authors: [
    { name: "Saikat Dutta" },
    { name: "Dr. Murali BK" }
  ],
  openGraph: {
    title: "PLCAutoPilot - AI-Powered PLC Programming Assistant",
    description: "Transform specifications into production-ready PLC code in minutes. Founded by Saikat Dutta.",
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
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
