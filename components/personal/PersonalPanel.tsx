"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar la localización en español

// Definir tipo para empleados
interface Empleado {
  id: number;
  nombre: string;
  horario: { inicio: Date; fin: Date }; // Usamos fechas para el horario
}

const PersonalPanel = () => {
  const { isDark } = useTheme();

  // Estado para controlar si estamos editando un empleado
  const [editando, setEditando] = useState(false);

  // Estado para empleados
  const [empleados, setEmpleados] = useState<Empleado[]>([
    {
      id: 1,
      nombre: "Juan Pérez",
      horario: {
        inicio: new Date(2023, 9, 25, 9, 0), // 25 de octubre de 2023, 09:00
        fin: new Date(2023, 9, 25, 18, 0), // 25 de octubre de 2023, 18:00
      },
    },
    {
      id: 2,
      nombre: "María Gómez",
      horario: {
        inicio: new Date(2023, 9, 26, 10, 0), // 26 de octubre de 2023, 10:00
        fin: new Date(2023, 9, 26, 17, 0), // 26 de octubre de 2023, 17:00
      },
    },
  ]);

  // Estado para el formulario de empleados
  const [nuevoEmpleado, setNuevoEmpleado] = useState<Empleado>({
    id: 0,
    nombre: "",
    horario: { inicio: new Date(), fin: new Date() },
  });

  // Función para guardar o actualizar un empleado
  const guardarEmpleado = (e: React.FormEvent) => {
    e.preventDefault();

    if (editando) {
      // Editar empleado existente
      setEmpleados((prev) =>
        prev.map((empleado) =>
          empleado.id === nuevoEmpleado.id ? nuevoEmpleado : empleado
        )
      );
    } else {
      // Crear nuevo empleado
      setEmpleados((prev) => [
        ...prev,
        { ...nuevoEmpleado, id: Date.now() }, // Usar timestamp como ID
      ]);
    }

    // Limpiar el formulario
    setNuevoEmpleado({ id: 0, nombre: "", horario: { inicio: new Date(), fin: new Date() } });
    setEditando(false);
  };

  // Función para eliminar un empleado
  const eliminarEmpleado = (id: number) => {
    setEmpleados((prev) => prev.filter((empleado) => empleado.id !== id));
  };

  // Función para editar un empleado
  const editarEmpleado = (empleado: Empleado) => {
    setNuevoEmpleado(empleado);
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
        <CardTitle className={`${isDark ? "text-gray-200" : "text-gray-800"}`}>
          Gestión de Empleados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={guardarEmpleado}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Nombre del Empleado */}
            <div>
              <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Nombre
              </Label>
              <Input
                required
                type="text"
                placeholder="Nombre del empleado"
                value={nuevoEmpleado.nombre}
                onChange={(e) =>
                  setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
                }
                className={`w-full ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              />
            </div>

            {/* Horario de Inicio */}
            <div>
              <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Horario de Inicio
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      isDark
                        ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {format(nuevoEmpleado.horario.inicio, "dd/MM/yyyy HH:mm", {
                      locale: es,
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-auto p-0 ${isDark ? "bg-gray-800" : "bg-white"}`}
                >
                  <Calendar
                    mode="single"
                    selected={nuevoEmpleado.horario.inicio}
                    onSelect={(date) =>
                      setNuevoEmpleado({
                        ...nuevoEmpleado,
                        horario: {
                          ...nuevoEmpleado.horario,
                          inicio: date || new Date(),
                        },
                      })
                    }
                    initialFocus
                    className={`${
                      isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Horario de Fin */}
            <div>
              <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Horario de Fin
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      isDark
                        ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {format(nuevoEmpleado.horario.fin, "dd/MM/yyyy HH:mm", {
                      locale: es,
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-auto p-0 ${isDark ? "bg-gray-800" : "bg-white"}`}
                >
                  <Calendar
                    mode="single"
                    selected={nuevoEmpleado.horario.fin}
                    onSelect={(date) =>
                      setNuevoEmpleado({
                        ...nuevoEmpleado,
                        horario: {
                          ...nuevoEmpleado.horario,
                          fin: date || new Date(),
                        },
                      })
                    }
                    initialFocus
                    className={`${
                      isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Botón para guardar o actualizar */}
          <div className="flex justify-start mb-6">
            <Button
              type="submit"
              className={`${
                isDark
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              {editando ? "Actualizar Empleado" : "Agregar Empleado"}
            </Button>
          </div>
        </form>

        {/* Lista de Empleados */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Horario de Inicio</TableHead>
              <TableHead>Horario de Fin</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>
                  {format(empleado.horario.inicio, "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  {format(empleado.horario.fin, "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`mr-4 ${
                      isDark
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "bg-sky-500 hover:bg-sky-600 text-white"
                    }`}
                    onClick={() => editarEmpleado(empleado)}
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
                    onClick={() => eliminarEmpleado(empleado.id)}
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

export default PersonalPanel;