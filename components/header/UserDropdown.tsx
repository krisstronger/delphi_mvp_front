"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const onConfirmLogout = () => {
    window.location.href = "/";
  };

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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <UserCircleIcon
              className={`w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            />
          </div>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Usuario
          </span>
        </div>
        {isOpen ? (
          <ArrowUpIcon
            className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          />
        ) : (
          <ArrowDownIcon
            className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          />
        )}
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-44 rounded-lg shadow-lg border ${
          isOpen ? "block" : "hidden"
        } ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-2 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`font-medium ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Usuario
            </h3>
          </div>
          <div className="space-y-2">
            <button
              className={`w-full p-2 text-left text-sm font-medium transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/perfil")}
            >
              Mi Perfil
            </button>
            <button
              className={`w-full p-2 text-left text-sm font-medium transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => router.push("/configuracion")}
            >
              Configuración
            </button>
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2" />
            <button
              className={`w-full p-2 text-left text-sm font-medium transition-colors ${
                isDark
                  ? "text-red-400 hover:bg-red-900/20"
                  : "text-red-600 hover:bg-red-50"
              }`}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={onCancel}
        onConfirm={onConfirmLogout}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        icon={<ExclamationTriangleIcon className="w-12 h-12 text-red-500" />}
      />
    </div>
  );
};

export default UserDropdown;
