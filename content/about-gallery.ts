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
    src: "/images/camila-tejido-y-gatos.jpeg",
    alt: "Camila con un tejido azul y violeta, acompañada por sus dos gatos",
    title: "Tejido y compañía",
    caption: "Un sweater tejido a mano y dos ayudantes que siempre participan del proceso.",
    category: "tejidos",
    date: "Agosto 2026",
    orientation: "portrait",
  },
];

