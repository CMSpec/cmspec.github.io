export default function SiteHeader() {
  return (
    <header className="site-header flat-header global-site-header">
      <a className="brand" href="/#inicio" aria-label="CMSpec, inicio">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>CMSpec</span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="/aprender">Notas</a>
        <a href="/#laboratorio">Laboratorio</a>
        <a href="/#tejido">Tejido</a>
        <a href="/sobre-mi">Sobre mí</a>
      </nav>
      <a className="header-cta" href="/#contacto">Contacto <span aria-hidden="true">↗</span></a>
    </header>
  );
}
