"use client";
import { useTheme } from "@/context/ThemeContext";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import HorariosPanel from "@/components/agendas/HorariosPanel";

export default function Agenda() {
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
          Agendas
        </h1>
        <div className="space-y-6">
          <HorariosPanel />
        </div>
      </div>
    </div>
  );
}
