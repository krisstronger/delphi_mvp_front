"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect,useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const Login = () => {
  const { isDark } = useTheme();
  const router = useRouter();
  const { login, user } = useAuth();
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);

      // Redirigir basado en el rol del usuario
      if (user?.type === "admin") {
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
        <CardHeader className="text-center mt-0">
          <CardTitle className="text-2xl font-bold text-white">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src="/assets/images/logo/logo2.png"
            alt="logo"
            width={300}
            height={300}
            className="mx-auto my-0"
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Correo Electrónico
              </Label>
              <Input
                id="email"
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
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Botón de Login */}
            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 transition"
            >
              Iniciar Sesión
            </Button>

            {/* Enlace de recuperación */}
            <p className="text-sm text-gray-400 text-center mt-2">
              ¿Olvidaste tu contraseña?{" "}
              <a href="#" className="text-sky-500 hover:underline">
                Recupérala aquí
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

export default Login;