"use client";
import { useTheme } from "@/context/ThemeContext";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import EventosPanel from "@/components/eventos/EventosPanel";

export default function Eventos() {
  const { isDark } = useTheme(); // Usa la variable isDark del contexto

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className={`rounded-2xl border p-5 ${
          isDark
            ? "border-gray-800 bg-gray-900 text-white"
            : "border-gray-200 bg-gray-100/50 text-gray-800"
        } lg:p-6`}
      >
       <h1
          className={`text-2xl font-bold mb-5  ${
            isDark 
            ? "text-sky-400" 
            : "text-sky-600"
          }`}
        >
          Eventos
        </h1>
        <div className="space-y-6">
          <EventosPanel />
        </div>
      </div>
    </div>
  );
}
