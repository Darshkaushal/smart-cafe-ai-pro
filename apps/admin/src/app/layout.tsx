import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DK's Cafe Owner Dashboard",
  description: "Private owner dashboard for DK's Cafe."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
