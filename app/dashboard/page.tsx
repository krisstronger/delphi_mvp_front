"use client";
import { useTheme } from "@/context/ThemeContext";
import Dashboard from "@/components/Dashboard";
import BusinessDashboard from "@/components/BusinessDashboard";

export default function DashboardPage() {
  const { isDark } = useTheme(); // Usa la variable isDark del contexto
  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className={`rounded-2xl border p-5 ${
          isDark
            ? "border-gray-800 bg-gray-900 text-white"
            : "border-gray-200 bg-slate-100/50 text-gray-800"
        } lg:p-6`}
      >
          <h1
          className={`text-2xl font-bold mb-5  ${
            isDark 
            ? "text-sky-400" 
            : "text-sky-600"
          }`}
        >
          Inicio
        </h1>
        <div className="space-y-6">    
        <BusinessDashboard />
        </div>
        <div className="space-y-6">    
        <Dashboard />
        </div>
  
    </div>
    </div>
  );

}
