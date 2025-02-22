// import images
import LogoImg from "@/public/assets/images/logo/logo_nobg.png";
import GridShape from "@/public/assets/images/shape/grid-01.svg";

export const gridShape = {
  logo: GridShape,
};

export const header = {
  logo: LogoImg,
  btnText: "AGENDA TU DEMO",
};


export const nav = [
  { name: "Inicio", href: "#hero" },
  { name: "Nosotros", href: "#feature" },
  { name: "Precio", href: "#pricing" },
  { name: "Comentarios", href: "#testimonial" },
];


export const hero = {
  title: "Una agenda",
  subtitle: "hecha a tu medida.",
  lead1:
    "Con Delphi, personaliza tu calendario, programa eventos y recibe recordatorios. Desde el agendamiento hasta el monitoreo en tiempo real",
  lead2:
    "Aumenta la satisfacción de tus clientes, reduce las operaciones manuales y operativas y haz crecer tu negocio con Delphi.",
  image: LogoImg,
  btnText: "AGENDA TU DEMO",
};

export const features = {
  title: "Características principales",
  subtitle:
    "Conoce cómo nuestras características principales están llevando el agendamiento al siguiente nivel.",
    items : [
      {
        id: 0,
        title: "Gestión de agendas",
        image: "/assets/images/features/admin.jpg",
        description:
          "Organiza tus citas, reuniones y eventos en un solo lugar. Con Delphi, puedes crear, editar y eliminar eventos fácilmente, manteniendo tu agenda siempre actualizada y accesible desde cualquier dispositivo.",
      },
      {
        id: 1,
        title: "Recordatorios automáticos",
        image: "/assets/images/seg.webp",
        description:
          "Nunca olvides un compromiso importante. Delphi te envía recordatorios automáticos por correo electrónico o notificaciones push, asegurándote de que siempre estés al tanto de tus próximas actividades.",
      },
      {
        id: 2,
        title: "Colaboración en equipo",
        image: "/assets/images/features/barbers.png",
        description:
          "Comparte agendas y coordina con tu equipo de manera eficiente. Delphi permite a varios usuarios colaborar en la misma agenda, facilitando la planificación de reuniones y proyectos en equipo.",
      },
      {
        id: 3,
        title: "Acceso desde cualquier lugar",
        image: "/assets/images/features/app2.png",
        description:
          "Accede a tu agenda desde cualquier dispositivo, en cualquier momento. Con Delphi, tu información está sincronizada en la nube, lo que te permite gestionar tus compromisos desde tu computadora, tablet o smartphone.",
      },
    ],
};

