"use client";

import { useEffect } from "react";
import { sitePath } from "../../../lib/site-path";

// Preserve bookmarked section links without maintaining a second laboratory.
export default function LegacyLinearLabPage() {
  const destination = sitePath("/laboratorio/algebra-lineal");
  useEffect(() => { window.location.replace(destination + window.location.hash); }, [destination]);
  return <main className="learn-page"><h1>El laboratorio cambió de sección</h1><p><a href={destination}>Abrir el Laboratorio de Álgebra Lineal →</a></p></main>;
}
