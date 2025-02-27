"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GridShape from "@/components/common/GridShape";
const Register = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  router.push("/dashboard"); // Redirige al dashboard después del registro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(29,78,216,0.3),_transparent)]"></div>
       */}
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

            {/* Campo Confirmar Contraseña */}
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
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
    </div>
  );
};

export default Register;
