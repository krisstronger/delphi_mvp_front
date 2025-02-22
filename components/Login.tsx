"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridShape from "@/components/common/GridShape";

const Login = () => {
  const router = useRouter();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticación aquí (puedes usar NextAuth.js, Firebase Auth, etc.)
    const isLoginSuccessful = true; // Simula un login exitoso

    if (isLoginSuccessful) {
      router.push("/dashboard"); // Redirige a /admin después del login
    } else {
      alert("Credenciales incorrectas"); // Manejo de errores
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(29,78,216,0.3),_transparent)]"></div>
       */}
             <GridShape />
      <Card className="w-full max-w-md bg-gray-900 shadow-xl border border-gray-800 rounded-2xl relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300">Correo Electrónico</Label>
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
              <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-1 bg-gray-800 border-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Botón de Login */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition">
              Iniciar Sesión
            </Button>

            {/* Enlace de recuperación */}
            <p className="text-sm text-gray-400 text-center mt-2">
              ¿Olvidaste tu contraseña? <a href="#" className="text-blue-500 hover:underline">Recupérala aquí</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
