export type AboutGalleryCategory = "bookbinding" | "tejidos" | "viajes";

export type AboutGalleryEntry = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: AboutGalleryCategory;
  date: string;
  orientation?: "portrait" | "landscape" | "square";
};

// Para añadir una foto:
// 1. Guarda el archivo en public/images/ultimamente/.
// 2. Copia una entrada como la de abajo y modifica sus datos.
export const aboutGallery: AboutGalleryEntry[] = [
  {
    src: "/images/ultimamente/bookbinding-coleccion-chiyogami.jpg",
    alt: "Tres encuadernaciones artesanales superpuestas, en tonos dorado, verde y calipso",
    title: "Una pequeña colección en chiyogami",
    caption: "Papeles chiyogami verdes, calipso y dorado encontrados en Reako, Osaka, convertidos en cuadernos con estructuras de encuadernación distintas.",
    category: "bookbinding",
    date: "Diciembre 2025",
    orientation: "portrait",
  },
  {
    src: "/images/ultimamente/bookbinding-belga-verde-calipso.jpg",
    alt: "Dos cuadernos con encuadernación belga y papeles chiyogami verde y calipso",
    title: "Encuadernación belga",
    caption: "La costura articula tapas y lomo sin adhesivo. Esta estructura permite retirar o cambiar el contenido y volver a utilizar la cubierta.",
    category: "bookbinding",
    date: "Diciembre 2025",
    orientation: "landscape",
  },
  {
    src: "/images/ultimamente/bookbinding-belga-calipso-detalle.jpg",
    alt: "Detalle del lomo y la costura roja de un cuaderno calipso con papel chiyogami",
    title: "La estructura queda a la vista",
    caption: "Un detalle de la encuadernación belga: el hilo rojo forma parte de la construcción y también del dibujo exterior del cuaderno.",
    category: "bookbinding",
    date: "Diciembre 2025",
    orientation: "portrait",
  },
  {
    src: "/images/ultimamente/bookbinding-cuadernos-abiertos.jpg",
    alt: "Cuaderno abierto con papel chiyogami dorado y encuadernaciones artesanales al fondo",
    title: "Cuadernos para contenidos distintos",
    caption: "La elección de la estructura responde al uso: una encuadernación intercambiable para materiales que cambian y otra más estable para conservar un contenido fijo.",
    category: "bookbinding",
    date: "Diciembre 2025",
    orientation: "portrait",
  },
  {
    src: "/images/ultimamente/bookbinding-coptic-dorado.jpg",
    alt: "Cuaderno dorado con motivos vegetales y costura copta visible sobre una base de corte azul",
    title: "Coptic binding",
    caption: "Una encuadernación copta para contenidos más estáticos. La costura expuesta une los cuadernillos y permite que el libro se abra con comodidad.",
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
    date: "Agosto 2026",
    orientation: "portrait",
  },
];
