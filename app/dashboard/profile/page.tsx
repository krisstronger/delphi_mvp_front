// app/dashboard/profile/page.tsx
"use client"; // Asegúrate de que este componente sea del lado del cliente
import { useTheme } from "@/context/ThemeContext";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";

export default function Profile() {
  const { isDark } = useTheme(); // Usa la variable isDark del contexto

  return (
    <div className={isDark ? "dark" : ""}>
      <div className={`rounded-2xl border p-5 ${
        isDark
          ? "border-gray-800 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-800"
      } lg:p-6`}>
        <h3 className={`mb-5 text-lg font-semibold ${
          isDark ? "text-white/90" : "text-gray-800"
        } lg:mb-7`}>
          Perfil
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}