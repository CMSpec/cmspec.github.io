import { courseFeedbackHref, type CourseFeedbackContext } from "../../../lib/course-feedback";

export default function CourseFeedback({ course, topic }: {
  course: CourseFeedbackContext;
  topic?: { title: string; href: string };
}) {
  return <div className="course-feedback">
    <a className="course-feedback-button" href={courseFeedbackHref(course, topic)}>
      <strong>¿Encontraste algún error?</strong>
      <span>Ayúdanos a mejorar estos apuntes <span aria-hidden="true">↗</span></span>
    </a>
    <p>Se abrirá tu aplicación de correo con el enlace a {topic ? "este tema" : "este curso"}.</p>
  </div>;
}
