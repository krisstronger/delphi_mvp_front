"use client";

import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";
import { es } from "date-fns/locale"; // Importar la localización en español

const Calendar: React.FC = () => {
  const { isDark } = useTheme();
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventApi | null>(null); // Estado para el evento a eliminar

  useEffect(() => {
    // Cargar eventos desde el almacenamiento local cuando el componente se monta
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    // Guardar eventos en el almacenamiento local cuando cambian
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    // Abrir el diálogo de confirmación para eliminar el evento
    setEventToDelete(selected.event);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      eventToDelete.remove(); // Eliminar el evento
      handleCloseConfirmDialog(); // Cerrar el diálogo de confirmación
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar; // Obtener la instancia de la API del calendario.
      calendarApi.unselect(); // Deseleccionar el rango de fechas.

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  return (
    <div className={isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-6">
          <h1
          className={`text-2xl font-bold ${
            isDark 
            ? "text-sky-400" 
            : "text-sky-600"
          }`}
        >
          Eventos del calendario
        </h1>
          </div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No hay eventos
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  className={`border ${isDark ? "border-gray-700" : "border-gray-200"
                    } shadow px-4 py-2 rounded-md ${isDark ? "text-blue-300" : "text-blue-800"
                    }`}
                  key={event.id}
                >
                  {event.title}
                  <br />
                  <label className={isDark ? "text-gray-300" : "text-slate-950"}>
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      locale: es, // Formatear la fecha en español
                    })}{" "}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
            locale={es} // Localización en español
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Lista",
            }} // Personalizar los textos de los botones
          />
        </div>
      </div>

      {/* Diálogo para agregar nuevos eventos */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Evento</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Título del Evento"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Actualizar el título del nuevo evento mientras el usuario escribe.
              required
              className={`border ${isDark ? "border-gray-700" : "border-gray-200"
                } p-3 rounded-md text-lg ${isDark ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                }`}
            />
            <button
              className={`bg-green-500 text-white p-3 mt-5 rounded-md ${isDark ? "hover:bg-green-600" : "hover:bg-green-400"
                }`}
              type="submit"
            >
              Agregar
            </button>{" "}
            {/* Botón para enviar el nuevo evento */}
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar eventos */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <p>¿Estás seguro de que deseas eliminar el evento "{eventToDelete?.title}"?</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white p-2 rounded-md mr-2"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </button>
            <button
              className="bg-gray-300 text-black p-2 rounded-md"
              onClick={handleCloseConfirmDialog}
            >
              Cancelar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar; // Exportar el componente Calendar para su uso en otras partes de la aplicación.
