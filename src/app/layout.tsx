import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghost Sentinel | Cyber Threat Intelligence",
  description:
    "Ghost Sentinel is an anonymous cyber threat intelligence and OSINT research lab focused on digital defense and geopolitical cyber analysis.",
  keywords: [
    "cybersecurity",
    "threat intelligence",
    "OSINT",
    "malware analysis",
    "cyber defense",
    "Ghost Sentinel",
  ],
  openGraph: {
    title: "Ghost Sentinel | Monitoring the Digital Battlefield",
    description:
      "Threat Intelligence • Cyber Defense • OSINT Research with a stealth operations center aesthetic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#05080f] text-slate-100">{children}</body>
    </html>
  );
}
