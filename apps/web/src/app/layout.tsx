import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Ambient3DBackground } from "@/components/Visual3DSections";

export const metadata: Metadata = {
  title: "DK's Cafe Jaipur",
  description: "A warm, aesthetic Jaipur cafe for specialty coffee, dessert dates, quick orders, and table reservations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Ambient3DBackground />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
