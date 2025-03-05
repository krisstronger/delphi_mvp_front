"use client";
import { useTheme } from "@/context/ThemeContext";
import ConfiguracionPanel from "@/components/configuracion/ConfiguracionPanel";
import { useBusiness } from "@/context/BusinessContext";

export default function ConfiguracionPage() {
  const { isDark } = useTheme(); // Usa la variable isDark del contexto

  const { businessId } = useBusiness();

  if (!businessId) {
    return <p>Selecciona un negocio primero.</p>;
  }


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
          Configuración
        </h1>
        <div className="space-y-6">
          {/* Pasamos los datos del negocio al componente ConfiguracionPanel */}
          <ConfiguracionPanel business={businessId} />
        </div>
      </div>
    </div>
  );
}