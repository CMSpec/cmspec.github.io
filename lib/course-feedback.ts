export type CourseFeedbackContext = {
  title: string;
  slug: string;
};

export function courseFeedbackHref(course: CourseFeedbackContext, topic?: { title: string; href: string }) {
  const subject = `Corrección de apuntes · ${course.title}${topic ? ` · ${topic.title}` : ""}`;
  const url = `https://cmspec.github.io/cursos/${course.slug}/${topic?.href ?? ""}`;
  const body = [
    "Hola, Camila:",
    "",
    "Encontré un posible error en los apuntes.",
    `Curso: ${course.title}`,
    ...(topic ? [`Tema: ${topic.title}`] : []),
    `Enlace: ${url}`,
    "",
    "El error que encontré es:",
    "",
    "",
    "Mi sugerencia de corrección (opcional):",
    "",
  ].join("\r\n");
  return `mailto:camila.mspec@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
