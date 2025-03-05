"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/context/ThemeContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Modal de confirmación

interface Evento {
  id: number;
  title: string;
  start: Date;
  end: Date;
  estado: "ocupado" | "disponible";
}

interface Profesional {
  id: number;
  nombre: string;
}

interface Servicio {
  id: number;
  nombre: string;
}

// Datos de ejemplo
const eventos: Evento[] = [
  {
    id: 1,
    title: "Reservado",
    start: new Date(2023, 9, 25, 10, 0), // 25 de octubre, 10:00
    end: new Date(2023, 9, 25, 11, 0), // 25 de octubre, 11:00
    estado: "ocupado",
  },
  {
    id: 2,
    title: "Disponible",
    start: new Date(2023, 9, 25, 11, 0), // 25 de octubre, 11:00
    end: new Date(2023, 9, 25, 12, 0), // 25 de octubre, 12:00
    estado: "disponible",
  },
];

const profesionales: Profesional[] = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María Gómez" },
];

const servicios: Servicio[] = [
  { id: 1, nombre: "Corte de Cabello" },
  { id: 2, nombre: "Manicura" },
];

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const UserPanel = () => {
  const { isDark } = useTheme();
  const [vista, setVista] = useState<"calendario" | "lista">("calendario");
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<Evento | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const seleccionarHorario = (evento: Evento) => {
    if (evento.estado === "disponible") {
      setHorarioSeleccionado(evento);
    }
  };

  const confirmarReserva = () => {
    if (!profesionalSeleccionado || !servicioSeleccionado || !horarioSeleccionado) {
      alert("Por favor, selecciona un profesional, un servicio y un horario.");
      return;
    }
    setModalAbierto(true); // Abrir modal de confirmación
  };

  const reservarCita = () => {
    alert(
      `Reserva confirmada:\nProfesional: ${profesionalSeleccionado}\nServicio: ${servicioSeleccionado}\nFecha: ${fechaSeleccionada.toLocaleDateString()}\nHora: ${horarioSeleccionado?.start.toLocaleTimeString()}`
    );
    setModalAbierto(false); // Cerrar modal después de confirmar
  };

  // Obtener los eventos del día seleccionado
  const eventosDelDia = eventos.filter(
    (evento) => evento.start.toDateString() === fechaSeleccionada.toDateString()
  );

  // Generar horarios disponibles para el día seleccionado
  const horariosDisponibles = eventosDelDia.filter(
    (evento) => evento.estado === "disponible"
  );

  return (
    <div className={`p-6 ${isDark ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-6">Reservar Cita</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label>Profesional</Label>
          <Select
            value={profesionalSeleccionado}
            onValueChange={setProfesionalSeleccionado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Profesional" />
            </SelectTrigger>
            <SelectContent>
              {profesionales.map((prof) => (
                <SelectItem key={prof.id} value={prof.nombre}>
                  {prof.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Servicio</Label>
          <Select
            value={servicioSeleccionado}
            onValueChange={setServicioSeleccionado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar Servicio" />
            </SelectTrigger>
            <SelectContent>
              {servicios.map((serv) => (
                <SelectItem key={serv.id} value={serv.nombre}>
                  {serv.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fecha</Label>
          <Calendar
            mode="single"
            selected={fechaSeleccionada}
            onSelect={setFechaSeleccionada}
            className="rounded-md border"
          />
        </div>
      </div>

      {/* Selector de Vista */}
      <div className="mb-6">
        <Button onClick={() => setVista("calendario")}>Vista Calendario</Button>
        <Button onClick={() => setVista("lista")}>Vista Lista</Button>
      </div>

      {/* Vista de Calendario */}
      {vista === "calendario" && (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {diasSemana.map((dia) => (
              <div key={dia} className="text-center font-bold">
                {dia}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, index) => {
              const fecha = new Date(fechaSeleccionada);
              fecha.setDate(fechaSeleccionada.getDate() - fechaSeleccionada.getDay() + index);
              return (
                <div
                  key={index}
                  className={`p-2 border rounded ${
                    fecha.toDateString() === fechaSeleccionada.toDateString()
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <div className="text-center">{fecha.getDate()}</div>
                  <div className="space-y-1">
                    {eventos
                      .filter(
                        (evento) =>
                          evento.start.toDateString() === fecha.toDateString()
                      )
                      .map((evento) => (
                        <button
                          key={evento.id}
                          className={`w-full p-1 rounded ${
                            evento.estado === "disponible"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                          onClick={() => seleccionarHorario(evento)}
                        >
                          {evento.start.toLocaleTimeString()}
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Vista de Lista de Horarios */}
      {vista === "lista" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Horarios Disponibles</h2>
          <ul className="space-y-2">
            {horariosDisponibles.map((evento) => (
              <li
                key={evento.id}
                className={`p-2 rounded ${
                  evento.estado === "disponible"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <button onClick={() => seleccionarHorario(evento)}>
                  {evento.start.toLocaleTimeString()} -{" "}
                  {evento.end.toLocaleTimeString()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de Reserva */}
      {horarioSeleccionado && (
        <div className="mt-6">
          <Button onClick={confirmarReserva} className="w-full">
            Reservar Cita
          </Button>
        </div>
      )}

      {/* Modal de Confirmación */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Reserva</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>Profesional:</strong> {profesionalSeleccionado}
            </p>
            <p>
              <strong>Servicio:</strong> {servicioSeleccionado}
            </p>
            <p>
              <strong>Fecha:</strong> {fechaSeleccionada.toLocaleDateString()}
            </p>
            <p>
              <strong>Hora:</strong> {horarioSeleccionado?.start.toLocaleTimeString()}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={reservarCita}>Confirmar</Button>
            <Button variant="outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPanel;