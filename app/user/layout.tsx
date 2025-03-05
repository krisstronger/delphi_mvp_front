"use client";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/components/dashboard/AppHeader";
import AppSidebar from "@/components/dashboard/AppSidebar";
import Backdrop from "@/components/dashboard/Backdrop";
import { useTheme } from "@/context/ThemeContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
 const { isDark } = useTheme(); // Usa la variable isDark del contexto

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[260px]"
    : "lg:ml-[80px]";

  return (
    // <div className="min-h-screen xl:flex bg-white">
       <div
        className={`min-h-screen xl:flex ${
          isDark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-200 bg-white text-gray-800"
        }`}
      >
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />

      {/* Contenido principal */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">{children}</div>
      </div>
    </div>
  );
}
