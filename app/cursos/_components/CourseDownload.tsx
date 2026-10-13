import { sitePath } from "../../../lib/site-path";

export default function CourseDownload({ slug }: { slug: string }) {
  return <div className="course-download">
    <a href={sitePath(`/descargas/${slug}.pdf`)} download>↓ Descargar curso completo · PDF</a>
    <p>Lectura sin conexión, con índice, ejercicios y ayudas al final. Descarga libre, sin correo.</p>
    <p>El PDF se actualiza cada vez que se publica una nueva versión de estos apuntes.</p>
  </div>;
}
