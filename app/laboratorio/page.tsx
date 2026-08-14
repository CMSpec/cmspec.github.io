import SiteHeader from "../_components/SiteHeader";
import InteractiveRepository from "./InteractiveRepository";
import SageMathCell from "./SageMathCell";

export default function LaboratoryPage() {
  return (
    <main className="learn-page course-library-page laboratory-page">
      <SiteHeader />
      <section className="learn-masthead laboratory-masthead">
        <div className="course-spectrum" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="course-kicker">CMSPEC / COMPLEMENTOS INTERACTIVOS</p>
        <h1>Laboratorio</h1>
        <div className="learn-deck"><p>Todas las exploraciones de CMSpec reunidas para experimentar directamente, sin abandonar esta página.</p></div>
      </section>

      <section className="laboratory-calculator" aria-label="Calculadora SageMath"><SageMathCell /></section>
      <section className="laboratory-repository" aria-label="Repositorio de complementos"><InteractiveRepository /></section>

      <aside className="learn-colophon"><span>CMSpec · LABORATORIO</span><p>Cada complemento funciona aquí de manera independiente y conserva un enlace con la entrada donde se desarrolla su contexto.</p></aside>
      <footer className="course-footer"><p>CMSpec · Laboratorio</p><a href="mailto:camila.mspec@gmail.com">camila.mspec@gmail.com ↗</a></footer>
    </main>
  );
}
