import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaid-Portfolio | Mohomed Zaid Nasheem",
  description: "Portfolio of Mohomed Zaid Nasheem — Graphic Designer & Aspiring Software Engineer specializing in React, Tailwind CSS, UI/UX, and full-stack web applications.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased font-sans bg-[#0a0a0f] text-slate-200 selection:bg-blue-500/30 selection:text-blue-100">
        {children}
      </body>
    </html>
  );
}
