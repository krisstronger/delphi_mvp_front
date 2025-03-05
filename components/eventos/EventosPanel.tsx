"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale"; // Importar la localización en español

// Definir el tipo de un evento
interface Evento {
  id: string;
  nombre: string;
  fecha: Date; // Cambiar a tipo Date
  descripcion: string;
}

const EventosPanel = () => {
  const { isDark } = useTheme();

  // Estado para la lista de eventos
  const [eventos, setEventos] = useState<Evento[]>([]);

  // Estado para el formulario de creación/edición
  const [nuevoEvento, setNuevoEvento] = useState<Evento>({
    id: "",
    nombre: "",
    fecha: new Date(), // Inicializar con la fecha actual
    descripcion: "",
  });

  // Estado para controlar si estamos editando un evento
  const [editando, setEditando] = useState(false);

  // Manejar cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevoEvento({ ...nuevoEvento, [name]: value });
  };

  // Manejar cambios en la fecha
  const handleFechaChange = (date: Date | undefined) => {
    if (date) {
      setNuevoEvento({ ...nuevoEvento, fecha: date });
    }
  };

  // Crear o actualizar un evento
  const guardarEvento = () => {
    if (editando) {
      // Editar evento existente
      setEventos((prev) =>
        prev.map((evento) =>
          evento.id === nuevoEvento.id ? nuevoEvento : evento
        )
      );
    } else {
      // Crear nuevo evento
      setEventos((prev) => [
        ...prev,
        { ...nuevoEvento, id: Date.now().toString() }, // Usar timestamp como ID
      ]);
    }
    // Limpiar el formulario
    setNuevoEvento({ id: "", nombre: "", fecha: new Date(), descripcion: "" });
    setEditando(false);
  };

  // Eliminar un evento
  const eliminarEvento = (id: string) => {
    setEventos((prev) => prev.filter((evento) => evento.id !== id));
  };

  // Editar un evento
  const editarEvento = (evento: Evento) => {
    setNuevoEvento(evento);
    setEditando(true);
  };

  return (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Configuración de Horarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarEvento();
            }}
          >
            <div className="mb-4">
              <Label>Nombre del Evento</Label>
              <Input
                type="text"
                name="nombre"
                value={nuevoEvento.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Fecha del Evento
              </Label>
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
                    {format(nuevoEvento.fecha, "dd/MM/yyyy", {
                      locale: es,
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-auto p-0 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Calendar
                    mode="single"
                    selected={nuevoEvento.fecha}
                    onSelect={handleFechaChange}
                    initialFocus
                    className={`${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-4">
              <Label>Descripción</Label>
              <Input
                name="descripcion"
                value={nuevoEvento.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="submit"
              className={`${
                isDark
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              {editando ? "Actualizar Evento" : "Crear Evento"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Lista de Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eventos.length === 0 ? (
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No hay eventos registrados.
            </p>
          ) : (
            <ul className="space-y-4">
              {eventos.map((evento) => (
                <li
                  key={evento.id}
                  className={`border p-4 rounded-lg ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-200"
                      : "border-gray-200 bg-white text-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{evento.nombre}</h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {format(evento.fecha, "dd/MM/yyyy", { locale: es })}
                      </p>
                      <p>{evento.descripcion}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        onClick={() => editarEvento(evento)}
                        className={`${
                          isDark
                            ? "text-gray-200 hover:bg-gray-700"
                            : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => eliminarEvento(evento.id)}
                        className={`${
                          isDark
                            ? "text-gray-200 hover:bg-gray-700"
                            : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventosPanel;
