export type AboutGalleryCategory = "bookbinding" | "tejidos" | "viajes";

export type AboutGalleryEntry = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: AboutGalleryCategory;
  date: string;
  orientation?: "portrait" | "landscape" | "square";
  series?: "cuadernos-juntos";
};

// Para añadir una foto:
// 1. Guarda el archivo en public/images/ultimamente/.
// 2. Copia una entrada como la de abajo y modifica sus datos.
export const aboutGallery: AboutGalleryEntry[] = [
  {
    src: "/images/ultimamente/bookbinding-coleccion-chiyogami.jpg",
    alt: "Tres encuadernaciones artesanales superpuestas, en tonos rojo, verde y calipso",
    title: "Papeles y encuadernaciones",
    caption: "Papel chiyogami dorado, verde y calipso. Encuadernación: de tapa dura, belga y copta.",
    category: "bookbinding",
    date: "Julio 2026",
    orientation: "portrait",
    series: "cuadernos-juntos",
  },
  {
    src: "/images/ultimamente/bookbinding-belga-verde-calipso.jpg",
    alt: "Dos cuadernos con encuadernación belga y papeles chiyogami verde y calipso",
    title: "Chiyogami verde y calipso",
    caption: "Papel: chiyogami. Encuadernación: belga.",
    category: "bookbinding",
    date: "Julio 2026",
    orientation: "landscape",
  },
  {
    src: "/images/ultimamente/bookbinding-belga-calipso-detalle.jpg",
    alt: "Detalle del lomo y la costura roja de un cuaderno calipso con papel chiyogami",
    title: "Chiyogami calipso",
    caption: "Papel: chiyogami. Encuadernación: belga.",
    category: "bookbinding",
    date: "Julio 2026",
    orientation: "portrait",
  },
  {
    src: "/images/ultimamente/bookbinding-cuadernos-abiertos.jpg",
    alt: "Cuaderno abierto con papel de arroz rojo y detalles dorados, con encuadernaciones artesanales al fondo",
    title: "Papel de arroz rojo y chiyogami",
    caption: "Primer plano: papel de arroz rojo con dorado, encuadernación belga. Al fondo: chiyogami verde, encuadernaciones belga y copta.",
    category: "bookbinding",
    date: "Julio 2026",
    orientation: "portrait",
    series: "cuadernos-juntos",
  },
  {
    src: "/images/ultimamente/bookbinding-belga-rojo-dorado.jpg",
    alt: "Cuaderno de papel de arroz rojo con detalles dorados y encuadernación belga sobre una base de corte azul",
    title: "Papel de arroz rojo con dorado",
    caption: "Papel: papel de arroz rojo con detalles dorados. Encuadernación: belga.",
    category: "bookbinding",
    date: "Diciembre 2025",
    orientation: "landscape",
  },
  {
    src: "/images/camila-tejido-y-gatos.jpeg",
    alt: "Camila con un tejido azul y violeta, acompañada por sus dos gatos",
    title: "Tejido y compañía",
    caption: "Un sweater tejido a mano y dos ayudantes que siempre participan del proceso.",
    category: "tejidos",
    date: "Agosto 2024",
    orientation: "portrait",
  },
];
