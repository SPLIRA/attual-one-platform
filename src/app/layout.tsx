import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ATTUAL ONE",
    template: "%s | ATTUAL ONE",
  },
  description: "Diagnóstico comercial e gestão de visitas da TV Attual.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export const viewport: Viewport = {
  themeColor: "#0B2D4D",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
