"use client";
import { useState } from "react";
import { BellIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import NotificationItem from "@/components/header/NotificationItem";
import { useTheme } from "@/context/ThemeContext";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nueva solicitud de amistad",
      message: "Juan Pérez ha enviado una solicitud de amistad",
      date: "Hace 5 minutos",
      read: false,
    },
    {
      id: 2,
      title: "Notificación importante",
      message: "Se ha actualizado la versión del sistema",
      date: "Hace 2 horas",
      read: true,
    },
    {
      id: 3,
      title: "Mensaje nuevo",
      message: "Tienes un mensaje de María García",
      date: "Hace 1 día",
      read: false,
    },
  ]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 border-gray-600"
            : "bg-white hover:bg-gray-100 border-gray-200"
        }`}
      >
        <div className="relative">
          <BellIcon className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifications.filter((n) => !n.read).length}
          </span>
        </div>
        {isOpen ? (
          <ArrowUpIcon className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-500"}`} />
        ) : (
          <ArrowDownIcon className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-500"}`} />
        )}
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-80 rounded-lg shadow-lg border ${
          isOpen ? "block" : "hidden"
        } ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="p-4">
          <h3 className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-800"} mb-2`}>
            Notificaciones
          </h3>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;