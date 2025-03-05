"use client";
import React, { useState } from "react";
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import Modal from "@/components/Modal"; // Import the Modal component
import { es } from "date-fns/locale"; // Importar la localización en español
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AppointmentCalendar = () => {
  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("calendar"); // calendar or list
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedService, setSelectedService] = useState(""); // Cambiado a un solo valor
  const [fechaFin, setFechaFin] = useState<Date | undefined>(new Date());

  // Mock data
  const professionals = [
    { id: "1", name: "Dra. Jazmine Bahamondes", specialty: "Médico General" },
    { id: "2", name: "Dr. Michael Gonzalez", specialty: "Dentista" },
    { id: "3", name: "Dr. Emiliano Sandoval", specialty: "Dermatólogo" },
  ];

  const services = [
    { id: "1", name: "Consulta General", duration: 30 },
    { id: "2", name: "Control Ginecologico", duration: 60 },
    { id: "3", name: "Botox 3 Zonas", duration: 45 },
    { id: "4", name: "Rinomodelación", duration: 45 },
    { id: "5", name: "Limpieza Facial", duration: 45 },
  ];

  const timeSlots = [
    { time: "09:00", status: "disponible" },
    { time: "10:00", status: "agendado" },
    { time: "11:00", status: "disponible" },
    { time: "14:00", status: "disponible" },
    { time: "15:00", status: "bloqueado" },
  ];

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot: any, selectedDay?: Date) => {
    // Obtener la fecha base: si se proporciona selectedDay, usarla; de lo contrario, usar selectedDate
    const baseDate = selectedDay || selectedDate;

    // Combinar la fecha base con la hora del slot
    const [hours, minutes] = slot.time.split(":"); // Extraer horas y minutos
    const fullDate = new Date(baseDate);
    fullDate.setHours(parseInt(hours, 10)); // Establecer la hora
    fullDate.setMinutes(parseInt(minutes, 10)); // Establecer los minutos

    // Actualizar el estado con el slot y la fecha completa
    setSelectedSlot({ ...slot, fullDate });
  };

  const handleConfirmBooking = () => {
    if (!selectedProfessional || !selectedService) {
      toast.error("Debes seleccionar un profesional/servicio para agendar 😉");
      return;
    }
    setShowConfirmation(true);
  };

  const generateWeekDays = () => {
    const start = startOfWeek(selectedDate);
    return [...Array(7)].map((_, i) => {
      const date = addDays(start, i);
      return {
        date,
        dayName: format(date, "EEE", { locale: es }), // Formato corto del día en español (ej: "lun", "mar")
      };
    });
  };

  const CalendarHeader = () => (
    <div
      className={`mt-4 flex items-center justify-between mb-4 p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <div className="flex space-x-4">
        <button
          onClick={() => {
            const newDate = subWeeks(selectedDate, 1);
            setSelectedDate(newDate);
            setFechaFin(newDate); // Actualizar la fecha en el Popover
          }}
          className={`p-2 rounded-full ${
            isDark ? "hover:bg-gray-600" : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeftIcon
            className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "MMMM yyyy", {
            locale: es,
          })}
        </h2>
        <button
          onClick={() => {
            const newDate = addWeeks(selectedDate, 1);
            setSelectedDate(newDate);
            setFechaFin(newDate); // Actualizar la fecha en el Popover
          }}
          className={`p-2 rounded-full ${
            isDark ? "hover:bg-gray-600" : "hover:bg-gray-100"
          }`}
        >
          <ChevronRightIcon
            className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setViewMode("calendar")}
          className={`p-2 rounded ${
            viewMode === "calendar" ? "bg-sky-600 text-white" : "bg-gray-100"
          }`}
        >
          <CalendarIcon
            className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-600"}`}
          />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded ${
            viewMode === "list" ? "bg-sky-600 text-white" : "bg-gray-100"
          }`}
        >
          <ListBulletIcon
            className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-600"}`}
          />
        </button>
      </div>
    </div>
  );

  const FiltersPanel = () => (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          value={selectedProfessional}
          onValueChange={(value) => setSelectedProfessional(value)}
        >
          <SelectTrigger
            className={`w-full ${
              isDark
                ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
            }`}
          >
            <SelectValue placeholder="Seleccionar Profesional" />
          </SelectTrigger>
          <SelectContent
            className={`${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            {professionals.map((prof) => (
              <SelectItem key={prof.id} value={prof.id}>
                {prof.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedService}
          onValueChange={(value) => setSelectedService(value)}
        >
          <SelectTrigger
            className={`w-full ${
              isDark
                ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
            }`}
          >
            <SelectValue placeholder="Seleccionar Servicio" />
          </SelectTrigger>
          <SelectContent
            className={`${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Picker with Popover */}
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start font-normal ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                    : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                }`}
              >
                {fechaFin
                  ? format(fechaFin, "dd/MM/yyyy", { locale: es })
                  : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={`w-auto p-0 ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <Calendar
                mode="single"
                selected={fechaFin}
                onSelect={(date) => {
                  if (date) {
                    setFechaFin(date);
                    setSelectedDate(date); // Actualizar la fecha seleccionada

                    // Si hay una hora seleccionada, actualizar fullDate
                    if (selectedSlot) {
                      const [hours, minutes] = selectedSlot.time.split(":");
                      const fullDate = new Date(date);
                      fullDate.setHours(parseInt(hours, 10));
                      fullDate.setMinutes(parseInt(minutes, 10));
                      setSelectedSlot({ ...selectedSlot, fullDate });
                    }
                  }
                }}
                initialFocus
                className={`${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => {
              setSelectedProfessional("");
              setSelectedService(""); // Limpiar el servicio seleccionado
            }}
            className={`w-full px-4 py-2 rounded-md ${
              isDark
                ? "bg-slate-600 hover:bg-slate-700 text-white"
                : "bg-slate-500 hover:bg-slate-600 text-white"
            }`}
          >
            Limpiar
          </Button>
          <Button
            className={`w-full px-4 py-2 rounded-md ${
              isDark
                ? "bg-sky-600 hover:bg-sky-700 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );

  const CalendarView = () => (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <div
        className={`grid grid-cols-7 gap-px ${
          isDark
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-200 bg-white text-gray-800"
        }`}
      >
        {generateWeekDays().map(({ date, dayName }) => (
          <div key={date.toString()} className="p-4">
            <div className="text-sm font-semibold mb-2">
              {dayName} {/* Mostrar el nombre del día en español */}
            </div>
            <div className="text-lg">{format(date, "d")}</div>
            <div className="space-y-2 mt-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot.time}
                  onClick={() => handleSlotSelect(slot, date)} // Pasar la fecha del día
                  className={`p-2 rounded cursor-pointer transition-colors ${
                    slot.status === "disponible"
                      ? "bg-green-500 hover:bg-green-600"
                      : slot.status === "agendado"
                      ? "bg-red-500"
                      : "bg-gray-600"
                  }`}
                >
                  {slot.time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = () => (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <div className="space-y-2">
        {timeSlots.map((slot) => (
          <div
            key={slot.time}
            onClick={
              () => slot.status === "disponible" && handleSlotSelect(slot) // No se pasa fecha, se usa selectedDate
            }
            className={`p-4 rounded-lg flex items-center justify-between ${
              slot.status === "disponible"
                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                : slot.status === "agendado"
                ? "bg-red-500"
                : "bg-gray-600"
            }`}
          >
            <div className="flex items-center">
              <div className="text-lg font-semibold">{slot.time}</div>
              <div className="ml-4 text-sm text-white">
                {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`mx-auto px-2 py-2 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <FiltersPanel />
      <CalendarHeader />

      <div className="mb-8">
        {viewMode === "calendar" ? <CalendarView /> : <ListView />}

        {selectedSlot && (
          <div
            className={`mt-4 p-5 border rounded-2xl ${
              isDark
                ? "border-gray-700 bg-gray-800 text-white"
                : "border-gray-200 bg-white text-gray-800"
            }`}
          >
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Hora Seleccionada:{" "}
                  {format(selectedSlot.fullDate, "HH:mm", { locale: es })}
                </p>
                <p className="text-sm text-gray-600">
                  {format(
                    selectedSlot.fullDate,
                    "EEEE, d 'de' MMMM 'de' yyyy",
                    { locale: es }
                  )}
                </p>
              </div>

              <Button
                onClick={handleConfirmBooking}
                className={`${
                  isDark
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-sky-500 hover:bg-sky-600 text-white"
                }`}
              >
                Confirmar Reserva
              </Button>
            </div>
          </div>
        )}

        <Modal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={() => {
            // Handle the confirmation logic here
            setShowConfirmation(false);
            setSelectedSlot(null);
          }}
          title="¡Reserva Confirmada!"
          message="Tu cita ha sido programada exitosamente."
          icon={<CheckCircleIcon className="w-12 h-12 text-green-500" />}
        />
      </div>
    </div>
  );
};

export default AppointmentCalendar;
