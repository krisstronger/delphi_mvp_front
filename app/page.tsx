"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { features } from "@/data"

export default function Home() {
  const {  items } = features;

  return (
    <section className="text-gray-200 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">

      <div className="container-default flex flex-col items-center text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-bold">
          Organiza tu negocio con Delphi
        </h1>
        <Image
          src="/assets/images/logo/logo_nobg.png"
          alt="logo"
          width={300}
          height={300}
          className="mx-auto py-8"
        />
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          La herramienta definitiva para gestionar agendas, citas y eventos.
        </p>
        <div className="flex gap-6">
          <Link href="/login">
            <Button className="btn-primary">Iniciar Sesión</Button>
          </Link>
          <Link href="/register">
            <Button className="btn-primary">Regístrate</Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-default py-20">
        <h2 className="text-3xl font-bold text-accent text-center mb-8">
          ¿Por qué elegir Delphi?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 place-items-center">
        {items.map((item, index) => (
            <Card key={index} className=" text-center w-[450px] bg-gray-900 shadow-xl border border-gray-800 rounded-2xl relative z-10">
              <CardHeader className="flex items-center">
              <Image
         src="/assets/images/logo/logo_nobg.png"
          alt="logo"
          width={300}
          height={300}
          className="mx-auto py-8"
        />
              <div className="ml-4">
              <CardTitle className="text-accent">{item.title}</CardTitle>
              {/* <CardDescription>Category</CardDescription> */}
              </div>
              </CardHeader>
              <CardContent>
                 <p className="text-gray-400">
                  {item.description}
                </p>
              </CardContent>
              </Card>
          ))}
        </div>
      </div>

      {/* Call-to-action Section */}
      <div className="bg-primary py-16 text-center">
        <div className="container-default">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Regístrate hoy y lleva la gestión de tu negocio al siguiente nivel.
          </p>
          <Link href="/register">
            <Button className="btn-primary ">Regístrate gratis</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
