// app/dashboard/layout.tsx
"use client"
import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "@/components/Dashboard/AppHeader";
import AppSidebar from "@/components/Dashboard/AppSidebar";
import Backdrop from "@/components/Dashboard/Backdrop";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Proveedores de contexto */}
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Backdrop (para móviles) */}
        <Backdrop />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Header */}
          <AppHeader />

          {/* Contenido de la página */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}