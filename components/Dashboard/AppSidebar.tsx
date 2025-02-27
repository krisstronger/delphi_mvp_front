"use client";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  StarIcon,
  SwatchIcon
} from "@heroicons/react/24/outline";

const AppSidebar = () => {
  const {
    isMobileOpen,
    activeItem,
    openSubmenu,
    toggleSubmenu,
    setActiveItem,
  } = useSidebar();
  const { theme, isDark } = useTheme();
  const pathname = usePathname();

  // Definición de los menús principales y submenús
  const navItems = [
    {
      id: "inicio",
      label: "Inicio",
      href: "/dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      submenu: [],
    },
    {
      id: "agendas",
      label: "Agendas",
      href: "/dashboard/agendas",
      icon: <CalendarIcon className="w-6 h-6" />,
      submenu: [],
    },
    {
      id: "eventos",
      label: "Eventos",
      href: "",
      icon: <StarIcon className="w-6 h-6" />,
      submenu: [
        { id: "crear-evento", label: "Crear Evento", href: "/dashboard/eventos/crear" },
        { id: "ver-eventos", label: "Ver Eventos", href: "/dashboard/eventos/lista" },
      ],
    },
    {
      id: "personal",
      label: "Personal",
      href: "/dashboard/personal",
      icon: <UsersIcon className="w-6 h-6" />,
      submenu: [],
    },
    {
      id: "servicios",
      label: "Servicios",
      href: "/dashboard/servicios",
      icon: <SwatchIcon className="w-6 h-6" />,
      submenu: [],
    },
    {
      id: "reportes",
      label: "Reportes",
      href: "/dashboard/reportes",
      icon: <ChartBarIcon className="w-6 h-6" />,
      submenu: [],
    },
    {
      id: "configuracion",
      label: "Configuración",
      href: "/dashboard/configuracion",
      icon: <CogIcon className="w-6 h-6" />,
      submenu: [],
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold text-sky-600 mb-6">Delphi</h1> */}
         <Image
                      width={200}
                      height={32}
                      className="dark:hidden text-center bg-center pl-2 max-w pr-0"
                      src="/assets/images/logo/logo_nobg.png"
                      alt="Logo"
                    />

        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                {/* Enlace principal del menú */}
                <Link
                  href={item.href}
                  className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? theme === "dark"
                        ? "bg-sky-900/20 text-white"
                        : "bg-sky-100 text-sky-600"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                  onClick={() => {
                    setActiveItem(item.id);
                    if (item.submenu.length > 0) {
                      toggleSubmenu(item.id);
                    }
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>

                {/* Submenús (si existen) */}
                {openSubmenu === item.id && item.submenu.length > 0 && (
                  <ul className="pl-8 mt-2 space-y-2">
                    {item.submenu.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <Link
                          href={submenuItem.href}
                          className={`flex items-center text-sm px-4 py-2 rounded-lg transition-colors ${
                            pathname === submenuItem.href
                              ? theme === "dark"
                                ? "bg-sky-900/20 text-white"
                                : "bg-sky-100 text-sky-600"
                              : theme === "dark"
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                          }`}
                          onClick={() => setActiveItem(submenuItem.id)}
                        >
                          <span>{submenuItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;