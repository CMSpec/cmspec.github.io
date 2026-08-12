"use client";

import { useRef, useState } from "react";
import type { AboutGalleryCategory, AboutGalleryEntry } from "../../content/about-gallery";

const filters: Array<{ value: "todas" | AboutGalleryCategory; label: string }> = [
  { value: "todas", label: "Todas" },
  { value: "bookbinding", label: "Bookbinding" },
  { value: "tejidos", label: "Tejidos" },
  { value: "viajes", label: "Viajes" },
];

const categoryLabels: Record<AboutGalleryCategory, string> = {
  bookbinding: "Bookbinding",
  tejidos: "Tejidos",
  viajes: "Viajes",
};

export default function AboutGallery({ entries }: { entries: AboutGalleryEntry[] }) {
  const [filter, setFilter] = useState<"todas" | AboutGalleryCategory>("todas");
  const [selected, setSelected] = useState<AboutGalleryEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = filter === "todas" ? entries : entries.filter((entry) => entry.category === filter);

  function open(entry: AboutGalleryEntry) {
    setSelected(entry);
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function close() {
    dialogRef.current?.close();
    setSelected(null);
  }

  return (
    <section className="about-gallery" aria-labelledby="about-gallery-title">
      <header>
        <p className="about-gallery-index">02 / ÚLTIMAMENTE</p>
        <div>
          <h2 id="about-gallery-title">Cosas que he estado haciendo.</h2>
          <p>Procesos, objetos y lugares que forman parte de mi cuaderno fuera de la pantalla.</p>
        </div>
      </header>

      <div className="about-gallery-filters" aria-label="Filtrar la galería">
        {filters.map((item) => (
          <button
            type="button"
            className={filter === item.value ? "is-active" : ""}
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
            key={item.value}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length ? (
        <div className="about-gallery-grid">
          {visible.map((entry) => (
            <figure className={`about-gallery-card about-gallery-${entry.orientation ?? "landscape"}`} key={`${entry.src}-${entry.title}`}>
              <button type="button" onClick={() => open(entry)} aria-label={`Ampliar ${entry.title}`}>
                <img src={entry.src} alt={entry.alt} loading="lazy" />
                <span aria-hidden="true">↗</span>
              </button>
              <figcaption>
                <p>{categoryLabels[entry.category]} · {entry.date}</p>
                <strong>{entry.title}</strong>
                <span>{entry.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="about-gallery-empty">
          <span aria-hidden="true">＋</span>
          <strong>Este espacio está listo para nuevas fotos.</strong>
          <p>Aquí aparecerán tus próximas imágenes de {filters.find((item) => item.value === filter)?.label.toLowerCase()}.</p>
        </div>
      )}

      <p className="about-gallery-note">La galería seguirá creciendo con nuevos tejidos, encuadernaciones y recorridos.</p>

      <dialog className="about-gallery-dialog" ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <button type="button" className="about-gallery-close" onClick={close} aria-label="Cerrar imagen">×</button>
            <img src={selected.src} alt={selected.alt} />
            <footer><span>{categoryLabels[selected.category]} · {selected.date}</span><strong>{selected.title}</strong><p>{selected.caption}</p></footer>
          </div>
        )}
      </dialog>
    </section>
  );
}

