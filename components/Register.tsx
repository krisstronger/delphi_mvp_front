"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridShape from "@/components/common/GridShape";
import axios from 'axios';
import { useState } from 'react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { isDark } = useTheme();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setDialogOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });

      setMessage(response.data.message);

      // Redirigir basado en el rol del usuario
      if (response.data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error en el servidor');
      }
      setDialogOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <GridShape />
      <Card className="w-full max-w-md bg-gray-900 shadow-xl border border-gray-800 rounded-2xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Regístrate</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nombre */}
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Nombre Completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ingresa tu nombre"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Campo Correo Electrónico */}
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Ingresa tu correo"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Botón de Registro */}
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 transition">
              Registrarse
            </Button>

            {/* Enlace para iniciar sesión */}
            <p className="text-sm text-gray-400 text-center mt-2">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="text-sky-500 hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Diálogo de error */}
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            {/* Mensaje de respuesta */}
            {message && <p className="text-md text-gray-100 text-center mt-2">{message}</p>}

          </div>

        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Register;