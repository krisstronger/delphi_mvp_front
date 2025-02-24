"use client";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserInfoCard() {
  const { isDark } = useTheme(); // Usa la variable isDark del contexto
  const { isOpen, openModal, closeModal } = useModal();
  
  const [formData, setFormData] = useState({
    firstName: "Kris",
    lastName: "Sandoval",
    email: "ksandoval@gmail.com",
    phone: "+09 363 398 46",
    bio: "Team Lead",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Guardando cambios...", formData);
    closeModal();
  };

  return (
    <div className={`p-5 border rounded-2xl ${
      isDark
        ? "border-gray-700 bg-gray-800 text-white"
        : "border-gray-200 bg-white text-gray-800"
    }`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-gray-800"
          } lg:mb-6`}>
            Información Personal
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className={`mb-2 text-xs leading-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Primer Nombre
              </p>
              <p className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                {formData.firstName}
              </p>
            </div>

            <div>
              <p className={`mb-2 text-xs leading-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Apellido
              </p>
              <p className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                {formData.lastName}
              </p>
            </div>

            <div>
              <p className={`mb-2 text-xs leading-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Correo Electrónico
              </p>
              <p className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                {formData.email}
              </p>
            </div>

            <div>
              <p className={`mb-2 text-xs leading-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Teléfono
              </p>
              <p className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                {formData.phone}
              </p>
            </div>

            <div>
              <p className={`mb-2 text-xs leading-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                Bio
              </p>
              <p className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                {formData.bio}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className={`flex w-full items-center justify-center gap-2 rounded-full border ${
            isDark
              ? "border-gray-700 bg-gray-800 text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800"
          } px-4 py-3 text-sm font-medium shadow-theme-xs lg:inline-flex lg:w-auto`}
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Editar
        </button>
      </div>

      {/* Modal de edición de información personal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleSave}
        title="Editar Información Personal"
        message="Actualiza tus detalles para mantener tu perfil al día."
        confirmText="Guardar Cambios"
        cancelText="Cancelar"
        className="max-w-[700px] w-full"
        icon={
                  <UserCircleIcon
                    className={` w-12 h-12 ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  />
                }
      >
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div>
              <Label
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Primer Nombre
              </Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full ${
                  isDark ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <Label
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Apellido
              </Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full ${
                  isDark ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <Label
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Correo Electrónico
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${
                  isDark ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <Label
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Teléfono
              </Label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full ${
                  isDark ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div className="col-span-2">
              <Label
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Bio
              </Label>
              <Input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={`w-full ${
                  isDark ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}