"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

const Dashboard = () => {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-2xl font-bold ${
            isDark ? "text-sky-400" : "text-sky-600"
          }`}
        >
          Dashboard
        </h1>
        <Button
          className={`${
            isDark
              ? "bg-sky-600 hover:bg-sky-700 text-white"
              : "bg-sky-500 hover:bg-sky-600 text-white"
          }`}
        >
          Nuevo Reporte
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              Usuarios Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">250</p>
          </CardContent>
        </Card>

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
              Reservas Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">120</p>
          </CardContent>
        </Card>

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
              Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$4,500</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y más contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Barras */}
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
              Reservas por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                Gráfico 1
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Torta */}
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
              Distribución de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                Gráfico 2
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tarjetas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Tareas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

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
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>

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
              Eventos Próximos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Progreso */}
      <div className="mt-6">
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
              Progreso Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
              <div
                className="bg-sky-500 h-2.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              65% completado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;