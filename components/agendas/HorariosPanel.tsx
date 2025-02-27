"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definir el tipo para el estado nuevoHorario
interface Horario {
  dia: string;
  horario: string;
  turnos: string[]; // turnos es un array de strings
}

const HorariosPanel = () => {
  const { isDark } = useTheme();
  const [horarios, setHorarios] = useState<
    { id: number; dia: string; horario: string; turnos: string[] }[]
  >([
    {
      id: 1,
      dia: "Lunes",
      horario: "09:00 - 18:00",
      turnos: ["09:00-12:00", "15:00-18:00"],
    },
    {
      id: 2,
      dia: "Martes",
      horario: "09:00 - 18:00",
      turnos: ["09:00-12:00", "15:00-18:00"],
    },
    { id: 3, dia: "Miércoles", horario: "Cerrado", turnos: [] },
  ]);

  // Usar el tipo Horario para el estado nuevoHorario
  const [nuevoHorario, setNuevoHorario] = useState<Horario>({
    dia: "",
    horario: "",
    turnos: [],
  });

  const [excepciones, setExcepciones] = useState([]);

  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Juan Pérez", horario: "Lunes a Viernes 09:00-18:00" },
    { id: 2, nombre: "María Gómez", horario: "Lunes a Jueves 10:00-17:00" },
  ]);

  const [servicios, setServicios] = useState([
    { id: 1, nombre: "Corte de cabello", duracion: 45 },
    { id: 2, nombre: "Manicura", duracion: 30 },
  ]);

  const agregarHorario = () => {
    setHorarios([...horarios, { ...nuevoHorario, id: horarios.length + 1 }]);
    setNuevoHorario({ dia: "", horario: "", turnos: [] });
  };

  const eliminarHorario = (id: any) => {
    setHorarios(horarios.filter((h) => h.id !== id));
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Selector de Día */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Día
              </Label>
              <Select
                onValueChange={(value) =>
                  setNuevoHorario({ ...nuevoHorario, dia: value })
                }
              >
                <SelectTrigger
                  className={`w-full ${
                    isDark
                      ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                      : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <SelectValue placeholder="Selecciona un día" />
                </SelectTrigger>
                <SelectContent
                  className={`${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-800"
                  }`}
                >
                  {[
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                    "Domingo",
                  ].map((dia) => (
                    <SelectItem
                      key={dia}
                      value={dia}
                      className={`${
                        isDark
                          ? "hover:bg-gray-600 focus:bg-gray-600"
                          : "hover:bg-gray-100 focus:bg-gray-100"
                      }`}
                    >
                      {dia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input de Horario */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Horario
              </Label>
              <Input
                type="text"
                placeholder="Ej. 09:00 - 18:00"
                value={nuevoHorario.horario}
                onChange={(e) =>
                  setNuevoHorario({ ...nuevoHorario, horario: e.target.value })
                }
                className={`w-full ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>

            {/* Input de Turnos */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Turnos
              </Label>
              <Input
                type="text"
                placeholder="Ej. 09:00-12:00, 15:00-18:00"
                value={nuevoHorario.turnos.join(", ")}
                onChange={(e) =>
                  setNuevoHorario({
                    ...nuevoHorario,
                    turnos: e.target.value.split(", "),
                  })
                }
                className={`w-full ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* Botón para Agregar Horario */}
          <Button
            onClick={agregarHorario}
            className={`mt-4 ${
              isDark
                ? "bg-sky-600 hover:bg-sky-700 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Agregar Horario
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Horarios Configurados */}
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Horarios Configurados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Día</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Turnos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {horarios.map((horario) => (
                <TableRow key={horario.id}>
                  <TableCell>{horario.dia}</TableCell>
                  <TableCell>{horario.horario}</TableCell>
                  <TableCell>{horario.turnos.join(", ")}</TableCell>
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
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => eliminarHorario(horario.id)}
                      className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gestión de Excepciones */}
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Días Feriados y Excepciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Fecha
              </Label>
              <Input
                type="date"
                className={`w-full ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Descripción
              </Label>
              <Input
                type="text"
                placeholder="Ej. Cerrado por feriado"
                className={`w-full ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>
          <Button
            className={`mt-4 ${
              isDark
                ? "bg-sky-600 hover:bg-sky-700 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            Agregar Excepción
          </Button>
        </CardContent>
      </Card>

      {/* Asignación de Horarios a Empleados */}
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Asignación de Horarios a Empleados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell>{empleado.nombre}</TableCell>
                  <TableCell>{empleado.horario}</TableCell>
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
                    <Button variant="destructive" size="sm"   className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}
                      >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Configuración de Servicios */}
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Configuración de Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Duración (min)</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>{servicio.nombre}</TableCell>
                  <TableCell>{servicio.duracion}</TableCell>
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
                    <Button 
                    variant="destructive" 
                    size="sm"
                    className={`mr-4 ${
                        isDark
                          ? "bg-rose-600 hover:bg-rose-700 text-white"
                          : "bg-rose-500 hover:bg-rose-600 text-white"
                      }`}
                      >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorariosPanel;
