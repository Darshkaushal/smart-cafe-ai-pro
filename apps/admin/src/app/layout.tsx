import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Cafe Owner Dashboard",
  description: "Admin panel for Smart Cafe AI."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
