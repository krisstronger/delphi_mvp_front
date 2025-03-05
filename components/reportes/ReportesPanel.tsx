"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import * as XLSX from "xlsx"; // Librería para generar archivos Excel
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar la localización en español
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportesPanel = () => {
  const { isDark } = useTheme();
  const [tipoReporte, setTipoReporte] = useState("mensual");
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>(new Date());
  const [fechaFin, setFechaFin] = useState<Date | undefined>(new Date());

  // Datos de ejemplo (simulación de datos de atenciones)
  const atenciones = [
    {
      fecha: "2023-10-01",
      trabajador: "Juan Pérez",
      cliente: "María Gómez",
      servicio: "Corte de Cabello",
      duracion: "1 hora",
      costo: 50,
    },
    {
      fecha: "2023-10-02",
      trabajador: "Ana López",
      cliente: "Carlos Ruiz",
      servicio: "Manicura",
      duracion: "30 minutos",
      costo: 30,
    },
    // Más atenciones...
  ];

  // Función para generar el reporte en formato XLS
  const generarReporte = () => {
    let datosReporte: any[] = [];

    if (tipoReporte === "mensual" && fechaInicio && fechaFin) {
      datosReporte = atenciones.filter((atencion) => {
        const fechaAtencion = new Date(atencion.fecha);
        return fechaAtencion >= fechaInicio && fechaAtencion <= fechaFin;
      });
    }

    // Crear un libro de Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datosReporte);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    // Generar un timestamp con fecha y hora
    const timestamp = format(new Date(), "yyyyMMdd_HHmmss"); // Formato: AñoMesDía_HoraMinutoSegundo

    // Nombre del archivo con timestamp
    const nombreArchivo = `Reporte_${tipoReporte}_${timestamp}.xlsx`;

    // Descargar el archivo
    XLSX.writeFile(workbook, nombreArchivo);
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
            Generar Reportes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Selección del Tipo de Reporte */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Tipo de Reporte
              </Label>
              <Select
                onValueChange={(value) =>
                  setTipoReporte(value )
                }
              >
                <SelectTrigger
                  className={`w-full ${
                    isDark
                      ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500"
                      : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <SelectValue placeholder="Selecciona un tipo de reporte" />
                </SelectTrigger>
                <SelectContent
                  className={`${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-800"
                  }`}
                >
                  {[
                    "Atenciones Mensuales",
                    "Atenciones Anuales",
                    "Reporte de Trabajadores",
                    "Reporte de Clientes",
                    "Reporte de Servicios",
                  ].map((tipoReporte) => (
                    <SelectItem
                      key={tipoReporte}
                      value={tipoReporte}
                      className={`${
                        isDark
                          ? "hover:bg-gray-600 focus:bg-gray-600"
                          : "hover:bg-gray-100 focus:bg-gray-100"
                      }`}
                    >
                      {tipoReporte}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  isDark
                    ? "bg-gray-600 border-gray-500 text-white"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >
                <option value="mensual">Atenciones Mensuales</option>
                <option value="anual">Atenciones Anuales</option>
                <option value="trabajadores">Reporte de Trabajadores</option>
                <option value="clientes">Reporte de Clientes</option>
                <option value="servicios">Reporte de Servicios</option>
              </select> */}
            </div>

            {/* Selector de Fecha de Inicio */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Fecha de Inicio
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
                    {fechaInicio
                      ? format(fechaInicio, "dd/MM/yyyy", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-auto p-0 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Calendar
                    mode="single"
                    selected={fechaInicio}
                    onSelect={setFechaInicio}
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

            {/* Selector de Fecha de Fin */}
            <div>
              <Label
                className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Fecha de Fin
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
                    {fechaFin
                      ? format(fechaFin, "dd/MM/yyyy", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-auto p-0 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Calendar
                    mode="single"
                    selected={fechaFin}
                    onSelect={setFechaFin}
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

            {/* Botón para Generar Reporte */}
            <Button
              onClick={generarReporte}
              className={`${
                isDark
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              Generar Reporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportesPanel;
