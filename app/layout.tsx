"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { BusinessProvider } from "@/context/BusinessContext"; // Importa el BusinessProvider

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <BusinessProvider> {/* Agrega el BusinessProvider aquí */}
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </BusinessProvider>
      </body>
    </html>
  );
}