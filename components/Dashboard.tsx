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
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        Bienvenido al Dashboard
      </h1>
      <p className="mt-2 text-gray-600">
        Aquí puedes gestionar tus agendas, citas y eventos.
      </p>
      {/* Agrega más componentes aquí */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sky-600">Dashboard</h1>
          <Button>Nuevo Reporte</Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-3xl font-bold">{data?.users || "250"}</p> */}
              <p className="text-3xl font-bold">250</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservas Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-3xl font-bold">{data?.reservations || "120"}</p> */}
              <p className="text-3xl font-bold">120</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-3xl font-bold">$ {data?.revenue || "4,500"}</p> */}
              <p className="text-3xl font-bold">4,500</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
