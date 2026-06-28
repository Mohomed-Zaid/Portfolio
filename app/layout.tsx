import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life OS Dashboard",
  description: "Futuristic developer portfolio",
  icons: {
    icon: [
      { url: "/logo.avif", type: "image/avif" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.avif", type: "image/avif" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
