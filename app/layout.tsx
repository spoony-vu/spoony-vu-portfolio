import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spoony.vu",
  description: "Interactive portfolio for Vu Minh Hieu. Designer working in crypto and AI.",
  openGraph: {
    title: "Spoony.vu",
    description: "Interactive portfolio for Vu Minh Hieu. Designer working in crypto and AI.",
    url: "https://spoony.vu",
    siteName: "Spoony.vu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Spoony.vu",
    description: "Interactive portfolio for Vu Minh Hieu. Designer working in crypto and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
