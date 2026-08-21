import SiteHeader from "../_components/SiteHeader";
import { sitePath } from "../../lib/site-path";
import InteractiveRepository, { type LaboratoryAreaId } from "./InteractiveRepository";

const collectionCopy: Record<LaboratoryAreaId, { number: string; title: string; description: string }> = {
  matematicas: {
    number: "01",
    title: "Matemáticas",
    description: "Proyecciones y construcciones geométricas vinculadas con las notas matemáticas.",
  },
  apuntes: {
    number: "02",
    title: "Apuntes",
    description: "Visualizaciones y demostraciones interactivas reunidas desde los cursos de pregrado.",
  },
  tejido: {
    number: "03",
    title: "Tejido & estructuras",
    description: "Trenzas, identificaciones, superficies y patrones para explorar la matemática del tejido.",
  },
};

export default function LaboratoryCollectionPage({ areaId }: { areaId: LaboratoryAreaId }) {
  const collection = collectionCopy[areaId];

  return (
    <main className={`learn-page course-library-page laboratory-page laboratory-collection-page laboratory-${areaId}`}>
      <SiteHeader />
      <section className="learn-masthead laboratory-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">{collection.number} / LABORATORIO CMSPEC</p>
        <h1>{collection.title}</h1>
        <div className="learn-deck"><p>{collection.description}</p></div>
        <a className="laboratory-back-link" href={sitePath("/laboratorio")}>← Todas las colecciones</a>
      </section>

      <section className="laboratory-repository" aria-label={`Menú del laboratorio de ${collection.title}`}>
        <InteractiveRepository areaId={areaId} />
      </section>

      <aside className="learn-colophon"><span>CMSpec · LABORATORIO</span><p>Selecciona una entrada del índice para abrir la visualización sin salir de esta colección.</p></aside>
      <footer className="course-footer"><p>CMSpec · Laboratorio</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
