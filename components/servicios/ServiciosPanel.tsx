"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definir tipo para servicios
interface Servicio {
  id: number;
  nombre: string;
  duracion: number; // Duración en minutos
}

const ServiciosPanel = () => {
  const { isDark } = useTheme();

  // Estado para servicios
  const [servicios, setServicios] = useState<Servicio[]>([
    { id: 1, nombre: "Corte de cabello", duracion: 45 },
    { id: 2, nombre: "Manicura", duracion: 30 },
  ]);

  // Estado para el formulario de servicios
  const [nuevoServicio, setNuevoServicio] = useState<Servicio>({
    id: 0,
    nombre: "",
    duracion: 0,
  });

    // Estado para manejar el error de validación
    const [errorNombre, setErrorNombre] = useState<string | null>(null);

  // Función para agregar un servicio
  const agregarServicio = () => {
    if (!nuevoServicio.nombre.trim()) {
      setErrorNombre("El nombre del servicio es obligatorio.");
      return; // Detener la ejecución si el nombre está vacío
    }

    // Limpiar el error si el nombre es válido
    setErrorNombre(null);

    setServicios([...servicios, { ...nuevoServicio, id: servicios.length + 1 }]);
    setNuevoServicio({ id: 0, nombre: "", duracion: 0 });
  };

  // Función para eliminar un servicio
  const eliminarServicio = (id: number) => {
    setServicios(servicios.filter((s) => s.id !== id));
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
          Gestión de Servicios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
                     <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>Nombre</Label>
                     <Input
                       type="text"
                       placeholder="Nombre del empleado"
                       value={nuevoServicio.nombre}
                       onChange={(e) => {
                         setNuevoServicio({ ...nuevoServicio, nombre: e.target.value });
                         setErrorNombre(null); // Limpiar el error al cambiar el valor
                       }}
                       className={`w-full ${
                         isDark
                           ? "bg-gray-600 border-gray-500 text-white"
                           : "bg-white border-gray-200 text-gray-800"
                       }`}
                     />
                     {errorNombre && (
                       <p className="text-sm text-red-500 mt-1">{errorNombre}</p>
                     )}
                   </div>
          <div>
            <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>Duración (min)</Label>
            <Input
              type="number"
              placeholder="Duración en minutos"
              value={nuevoServicio.duracion}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, duracion: parseInt(e.target.value) })
              }
              className={`w-full ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={agregarServicio}
              className={`${
                isDark
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              Agregar Servicio
            </Button>
          </div>
        </div>

        {/* Lista de Servicios */}
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
                    onClick={() => eliminarServicio(servicio.id)}
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

export default ServiciosPanel;