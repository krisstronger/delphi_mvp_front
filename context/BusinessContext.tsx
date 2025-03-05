"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo para el contexto
interface BusinessContextType {
  businessId: string | null;
  setBusinessId: (id: string) => void;
}

// Crea el contexto con un valor por defecto
const BusinessContext = createContext<BusinessContextType>({
  businessId: null,
  setBusinessId: () => {},
});

// Proveedor del contexto
export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [businessId, setBusinessId] = useState<string | null>(null);

  return (
    <BusinessContext.Provider value={{ businessId, setBusinessId }}>
      {children}
    </BusinessContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness debe usarse dentro de un BusinessProvider");
  }
  return context;
};