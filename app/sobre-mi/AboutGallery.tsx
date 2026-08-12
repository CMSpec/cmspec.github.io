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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = filter === "todas" ? entries : entries.filter((entry) => entry.category === filter);
  const grouped = visible.filter((entry) => entry.series === "cuadernos-juntos");
  const ungrouped = visible.filter((entry) => entry.series !== "cuadernos-juntos");
  const carouselEntry = grouped[carouselIndex % Math.max(grouped.length, 1)];

  function open(entry: AboutGalleryEntry) {
    setSelected(entry);
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function close() {
    dialogRef.current?.close();
    setSelected(null);
  }

  function card(entry: AboutGalleryEntry) {
    return (
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
    );
  }

  function moveCarousel(direction: number) {
    setCarouselIndex((current) => (current + direction + grouped.length) % grouped.length);
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
          {carouselEntry && (
            <figure className="about-gallery-card about-gallery-carousel">
              <div className="about-gallery-carousel-stage">
                <button type="button" className="about-gallery-carousel-image" onClick={() => open(carouselEntry)} aria-label={`Ampliar ${carouselEntry.title}`}>
                  <img src={carouselEntry.src} alt={carouselEntry.alt} loading="lazy" />
                </button>
                <button type="button" className="about-gallery-carousel-arrow is-prev" onClick={() => moveCarousel(-1)} aria-label="Foto anterior">‹</button>
                <button type="button" className="about-gallery-carousel-arrow is-next" onClick={() => moveCarousel(1)} aria-label="Foto siguiente">›</button>
                <span className="about-gallery-carousel-count" aria-hidden="true">{carouselIndex + 1}/{grouped.length}</span>
              </div>
              <div className="about-gallery-carousel-dots" aria-label="Elegir foto">
                {grouped.map((entry, index) => <button type="button" className={index === carouselIndex ? "is-active" : ""} onClick={() => setCarouselIndex(index)} aria-label={`Ver foto ${index + 1}: ${entry.title}`} key={entry.src} />)}
              </div>
              <figcaption>
                <p>{categoryLabels[carouselEntry.category]} · {carouselEntry.date}</p>
                <strong>{carouselEntry.title}</strong>
                <span>{carouselEntry.caption}</span>
              </figcaption>
            </figure>
          )}
          {ungrouped.map(card)}
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
