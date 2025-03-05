"use client";
import { useTheme } from "@/context/ThemeContext";
import UserPanel from "@/components/user/UserPanel";
import AppointmentCalendar from "@/components/user/AppointmentCalendar";
import Calendar from "@/components/fullCalendar/Calendar";

export default function Personal() {
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
          Agendar una cita
        </h1>
        <div className="space-y-6">
          <AppointmentCalendar />
        </div>
        <div className="space-y-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
