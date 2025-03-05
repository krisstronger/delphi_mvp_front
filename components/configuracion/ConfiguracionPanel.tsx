"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { toast } from "sonner";
import { format, isToday  } from "date-fns";
import { es } from 'date-fns/locale'; // Importar la localización en español

interface ConfiguracionPanelProps {
  business: string; // ID del negocio
}

const ConfiguracionPanel = ({ business }: ConfiguracionPanelProps) => {
  const { isDark } = useTheme();

// Inicializa el estado de la fecha con la fecha actual
const [date, setDate] = useState<Date>(new Date());

  // Estado para el logo
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Estado para la URL amigable
  const [urlAmigable, setUrlAmigable] = useState(business);

  // Manejar la subida del logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Manejar el guardado de la configuración
  const guardarConfiguracion = async () => {
    const formData = new FormData();
    if (logo) {
      formData.append("logo", logo);
    }
    formData.append("urlAmigable", urlAmigable);

    try {
      const response = await fetch(`/api/business/${business}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast("Configuración guardada exitosamente 😁", {
          description: format(new Date(), "dd MMMM, yyyy", { locale: es }), // Formato de fecha en español
          action: {
            label: "Cerrar",
            onClick: () => console.log("Cerrar"),
          },
        });
      } else {
        toast.error("Error al guardar la configuración 😢");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar la configuración 😢");
    }
  };

  return (
    <div
      className={`p-5 border rounded-2xl ${
        isDark
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      <Card
        className={`mb-6 ${
          isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            Personalización de la Página
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Subida de Logo */}
          <div className="mb-6">
            <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Logo del Negocio
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className={`w-full ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
            />
            {logoPreview && (
              <div className="mt-4">
                <img
                  src={logoPreview}
                  alt="Vista previa del logo"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Configuración de URL Amigable */}
          <div className="mb-6">
            <Label className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
              URL Amigable
            </Label>
            <Input
              type="text"
              placeholder="Ej. barberia123"
              value={urlAmigable}
              onChange={(e) => setUrlAmigable(e.target.value)}
              className={`w-full ${
                isDark
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
            />
            <p className="text-sm text-gray-500 mt-2">
              Tu URL será: tusreservas.com/{urlAmigable}
            </p>
          </div>

          <Button
            className={`${
              isDark
                ? "bg-sky-600 hover:bg-sky-700 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
            variant="outline"
            onClick={guardarConfiguracion}
          >
            Guardar Configuración
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracionPanel;
