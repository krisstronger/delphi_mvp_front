"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  icon?: React.ReactNode; // Prop para el icono
}

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm = () => {}, 
  title, 
  message, 
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  className = "",
  icon = ( // Icono por defecto
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}: ModalProps) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`p-6 rounded-lg ${
        isDark ? "bg-gray-800" : "bg-white"
      } shadow-2xl w-96 ${className}`}>
        <div className="flex items-center justify-center mb-4">
          {icon} {/* Aquí se renderiza el icono */}
        </div>
        <h3
          className={`text-xl font-medium mb-2 ${
            isDark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm mb-4 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium ${
              isDark
                ? "text-gray-400 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-100"
            } rounded-lg transition-colors`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
