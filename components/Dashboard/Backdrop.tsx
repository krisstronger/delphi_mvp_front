// components/Dashboard/Backdrop.tsx
"use client";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";

const Backdrop = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();
  const { theme } = useTheme();

  if (!isMobileOpen) return null;

  return (
    <div
     className={`fixed inset-0 z-20 lg:hidden transition-opacity duration-300 ${
        theme === "dark" ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50"
      }`}
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;