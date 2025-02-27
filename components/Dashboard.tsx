"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Enero", desktop: 186, mobile: 80 },
  { month: "Febrero", desktop: 305, mobile: 200 },
  { month: "Marzo", desktop: 237, mobile: 120 },
  { month: "Abril", desktop: 73, mobile: 190 },
  { month: "Mayo", desktop: 209, mobile: 130 },
  { month: "Junio", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "App Web",
    color: "#2563eb",
  },
  mobile: {
    label: "App Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

// DONUT
const chartData2 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const router = useRouter();
  const { isDark } = useTheme();

  const totalVisitors = React.useMemo(() => {
    return chartData2.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1
          className={`text-2xl font-bold ${
            isDark ? "text-sky-400" : "text-sky-600"
          }`}
        ></h1>
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
              Visitantes por navegador
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <ChartContainer
              config={chartConfig2}
              className="mx-auto aspect-square max-h-[350px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData2}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                           <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className={`text-3xl font-bold ${
                                isDark ? "text-white" : "text-black"
                              }`}
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className={`${
                                isDark ? "text-white" : "text-gray-600"
                              }`}
                            >
                              Visitantes
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
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
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
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
