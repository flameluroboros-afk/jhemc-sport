import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JHEMC SPORT | Alto Rendimiento",
  description: "Equipamiento deportivo premium para atletas de élite. Ropa y calzado de alto impacto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${oswald.variable} ${inter.variable} font-inter antialiased selection:bg-brand-neon selection:text-brand-dark bg-brand-dark text-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

