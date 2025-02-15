"use client"; // Marca el componente como del lado del cliente
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter(); // Hook para redireccionar

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario se envíe
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    router.push("/dashboard"); // Redirige al dashboard después del login
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        {/* Título */}
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
          Iniciar Sesión
        </h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full mt-10"
        >
          {/* Campo de correo electrónico */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-500 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="relative mb-8">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-400"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-500 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;