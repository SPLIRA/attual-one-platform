import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ATTUAL ONE Insight",
    template: "%s | ATTUAL ONE Insight",
  },
  description: "Cadastro basico de empresas do ATTUAL ONE Insight.",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
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
