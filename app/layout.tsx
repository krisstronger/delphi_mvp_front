"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
// app/layout.tsx
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner"

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
// app/layout.tsx
<html lang="es" className="scroll-smooth">
  <body className={`${outfit.variable} dark:bg-gray-900`}>
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
      <Toaster />
    </ThemeProvider>
  </body>
</html>
  );
}