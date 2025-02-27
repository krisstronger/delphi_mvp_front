"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BusinessDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("reservas"); // Estado para manejar la pestaña activa

  // Datos de ejemplo (simulación)
  const clients = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", phone: "+56912345678" },
    { id: 2, name: "María Gómez", email: "maria@example.com", phone: "+56987654321" },
  ];

  const reservations = [
    { id: 1, client: "Juan Pérez", service: "Corte de pelo", date: "2023-10-25 10:00", status: "Confirmada" },
    { id: 2, client: "María Gómez", service: "Manicura", date: "2023-10-26 15:00", status: "Pendiente" },
  ];

  const schedules = [
    { id: 1, day: "Lunes", hours: "09:00 - 18:00" },
    { id: 2, day: "Martes", hours: "09:00 - 18:00" },
    { id: 3, day: "Miércoles", hours: "Cerrado" },
  ];

  return (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      {/* Header del Dashboard */}
       <div className="flex justify-between items-center mb-6">
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-sky-400" : "text-sky-600"
                }`}
              >
                Resumen
              </h1>
              <Button
                className={`${
                  isDark
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-sky-500 hover:bg-sky-600 text-white"
                }`}
              >
                Nueva Reservas
              </Button>
            </div>

      {/* Pestañas de Navegación */}
      <div className="flex gap-4 mb-6">
        <Button
        className={`${
          isDark
            ? "bg-sky-600 hover:bg-sky-700 text-white"
            : "bg-sky-500 hover:bg-sky-600 text-white"
        }`}
          variant={activeTab === "reservas" ? "default" : "outline"}
          onClick={() => setActiveTab("reservas")}
        >
          Reservas
        </Button>
        <Button
        className={`${
          isDark
            ? "bg-sky-600 hover:bg-sky-700 text-white"
            : "bg-sky-500 hover:bg-sky-600 text-white"
        }`}
          variant={activeTab === "clientes" ? "default" : "outline"}
          onClick={() => setActiveTab("clientes")}
        >
          Clientes
        </Button>
        <Button
        className={`${
          isDark
            ? "bg-sky-600 hover:bg-sky-700 text-white"
            : "bg-sky-500 hover:bg-sky-600 text-white"
        }`}
          variant={activeTab === "horarios" ? "default" : "outline"}
          onClick={() => setActiveTab("horarios")}
        >
          Horarios
        </Button>
      </div>

      {/* Contenido Dinámico según la Pestaña Activa */}
      {activeTab === "reservas" && (
        <Card
          className={`${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
            >
              Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.client}</TableCell>
                    <TableCell>{reservation.service}</TableCell>
                    <TableCell>{reservation.date}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mr-4 ${
                          isDark
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                      >
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}>
                        Cancelar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "clientes" && (
        <Card
          className={`${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
            >
              Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mr-4 ${
                          isDark
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                      >
                        Ver Detalles
                      </Button>
                      <Button variant="destructive" size="sm" className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "horarios" && (
        <Card
          className={`${
            isDark
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
            >
              Horarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Día</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.hours}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mr-4 ${
                          isDark
                            ? "bg-sky-600 hover:bg-sky-700 text-white"
                            : "bg-sky-500 hover:bg-sky-600 text-white"
                        }`}
                      >
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessDashboard;