"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Dashboard() {
  // const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboardData });

  // if (isLoading) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-gray-700">Inicio</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-gray-700">Reportes</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-gray-700">Configuración</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
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

        {/* Tabla de Actividad */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Actividad Reciente</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Juan Pérez</TableCell>
                <TableCell>Reserva creada</TableCell>
                <TableCell>2024-07-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>María López</TableCell>
                <TableCell>Reserva cancelada</TableCell>
                <TableCell>2024-07-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Carlos Díaz</TableCell>
                <TableCell>Reserva modificada</TableCell>
                <TableCell>2024-07-30</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
