import type { EditorialEntry } from "../../content/collections";

function FunctionsOfAIArticle({ entry }: { entry: EditorialEntry }) {
  return (
    <article className="health-essay">
      <p className="health-essay-lead">{entry.introduction}</p>
      <p>
        Esta distinción parece sencilla, pero cambia la manera de leer los resultados. Si una herramienta resume una historia clínica, esperamos fidelidad a las fuentes; si estima un riesgo, necesitamos conocer su incertidumbre; si explica un modelo, queremos saber qué variables influyeron; y si detecta una anomalía, necesitamos ver la evidencia que originó la alerta. Una salida puede alimentar a la siguiente, aunque ninguna debería perder su identidad durante el recorrido.
      </p>

      <h2>Cuatro funciones que suelen convivir</h2>
      <p>
        En una aplicación real es frecuente que varias formas de IA trabajen juntas. La siguiente tabla no describe cuatro sistemas necesariamente separados, sino cuatro tareas que conviene reconocer antes de interpretar lo que aparece en pantalla.
      </p>
      <div className="health-table-wrap">
        <table className="health-table">
          <caption>Funciones de la inteligencia artificial aplicada a salud</caption>
          <thead>
            <tr><th>Función</th><th>Pregunta que responde</th><th>Salida esperable</th><th>Cuidado principal</th></tr>
          </thead>
          <tbody>
            <tr><th>Interpretativa</th><td>¿Qué variables influyen?</td><td>Relaciones, reglas o importancia de variables.</td><td>Importancia no significa causalidad.</td></tr>
            <tr><th>Predictiva</th><td>¿Qué podría ocurrir?</td><td>Probabilidad, puntaje o nivel de prioridad.</td><td>Debe informar incertidumbre y calibración.</td></tr>
            <tr><th>Generativa</th><td>¿Cómo organizar esta información?</td><td>Resumen, cronología o borrador.</td><td>Un texto fluido puede contener errores.</td></tr>
            <tr><th>Auditora</th><td>¿Qué no cuadra?</td><td>Alerta, discrepancia o dato atípico.</td><td>Una alerta pide revisión; no demuestra una falta.</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Imaginemos un conjunto de registros clínicos y administrativos. Primero puede extraerse texto de los documentos y organizarse en variables; luego un modelo estima una probabilidad; otra herramienta explica qué elementos pesaron en esa estimación; finalmente, un módulo de auditoría compara el resultado con reglas conocidas. El flujo puede ser útil, pero solo si conserva el camino de regreso: cada resumen debe llevar a su fuente y cada alerta debe mostrar por qué fue activada.
      </p>

      <aside className="health-reading-note">
        <strong>Una sutileza importante</strong>
        <p>El mismo número puede servir para ordenar una lista de revisión, describir un riesgo o apoyar una decisión. El significado no está contenido solamente en el valor: depende del propósito para el que fue construido y de lo que ocurrirá después.</p>
      </aside>

      <h2>Lo que cambia al mirar una población</h2>
      <p>
        En salud pública, estas herramientas permiten conectar fuentes extensas, anticipar demanda, reconocer desigualdades y orientar recursos limitados. Esa escala también vuelve más delicados sus efectos. Un modelo puede mejorar un indicador promedio y, al mismo tiempo, equivocarse de manera persistente en una región o grupo determinado. También puede aprender diferencias históricas que no representan necesidades sanitarias, sino desigualdades previas en acceso, diagnóstico o registro.
      </p>
      <div className="health-table-wrap">
        <table className="health-table health-table-balanced">
          <caption>Posibles aportes y riesgos en salud pública</caption>
          <thead><tr><th>Puede aportar</th><th>Puede introducir o amplificar</th><th>Pregunta que conviene hacer</th></tr></thead>
          <tbody>
            <tr><td>Detección temprana de patrones.</td><td>Falsas alarmas o grupos omitidos.</td><td>¿En quiénes funciona peor?</td></tr>
            <tr><td>Priorización de revisiones.</td><td>Confusión entre prioridad operativa y necesidad.</td><td>¿Qué efecto tiene sobre el acceso?</td></tr>
            <tr><td>Mayor consistencia en tareas repetitivas.</td><td>Repetición sistemática de un sesgo.</td><td>¿Cómo se puede detectar y corregir?</td></tr>
            <tr><td>Integración de fuentes dispersas.</td><td>Pérdida de contexto o privacidad.</td><td>¿Qué datos son realmente necesarios?</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Por eso la evaluación no termina cuando un modelo alcanza una buena exactitud. También hay que estudiar su calibración, revisar resultados por subgrupos, observar cambios en el tiempo y definir cuándo debe dejar de utilizarse. La IA puede ampliar la capacidad de observar y organizar información, pero sigue siendo una parte de un sistema humano e institucional más amplio. Su utilidad depende tanto del modelo como de las preguntas, las reglas y las responsabilidades que lo rodean.
      </p>
    </article>
  );
}

function HumanLoopArticle({ entry }: { entry: EditorialEntry }) {
  return (
    <article className="health-essay">
      <p className="health-essay-lead">{entry.introduction}</p>
      <p>
        La expresión se traduce habitualmente como «persona dentro del circuito». Sin embargo, una persona puede aparecer en distintos lugares: antes de que el sistema se use, mientras produce una recomendación, después de una alerta o al evaluar sus efectos sobre una población. Decir simplemente que existe supervisión humana no aclara cuál de esas tareas se realiza ni cuánto poder conserva quien supervisa.
      </p>

      <h2>De la revisión de un caso al control del sistema</h2>
      <p>
        Una manera amistosa de entenderlo es pensar en tres distancias. Muy cerca del resultado, alguien revisa el caso concreto. Un poco más lejos, otra mirada vigila cómo se comporta la herramienta durante semanas o meses. Y por encima de ambas existe una responsabilidad institucional que define para qué puede usarse, qué límites tiene y cuándo debe detenerse.
      </p>
      <div className="health-table-wrap">
        <table className="health-table">
          <caption>Niveles de participación humana en un sistema de IA</caption>
          <thead><tr><th>Relación</th><th>Cuándo interviene</th><th>Qué necesita poder hacer</th><th>Riesgo si es solo aparente</th></tr></thead>
          <tbody>
            <tr><th>In the loop</th><td>Antes de actuar en un caso.</td><td>Contrastar fuentes, incorporar contexto y rechazar la sugerencia.</td><td>Confirmar automáticamente lo que muestra la interfaz.</td></tr>
            <tr><th>On the loop</th><td>Mientras el sistema está en operación.</td><td>Observar incidentes, cambios y desempeño entre grupos.</td><td>Detectar problemas sin autoridad para intervenir.</td></tr>
            <tr><th>In command</th><td>Al definir y gobernar el uso.</td><td>Fijar propósitos, límites, auditorías y criterios de suspensión.</td><td>Responsabilidades dispersas cuando ocurre un daño.</td></tr>
            <tr><th>Out of the loop</th><td>No hay revisión caso a caso.</td><td>Restringir la automatización a tareas de bajo impacto y monitorearlas.</td><td>Extenderla gradualmente a decisiones para las que no fue diseñada.</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Estos niveles no compiten entre sí. En una aplicación sanitaria de alto impacto suelen necesitarse simultáneamente: revisión del caso, vigilancia de la operación y una estructura clara de gobierno. La automatización completa puede ser razonable para tareas administrativas acotadas, pero no debería avanzar por inercia hacia decisiones con consecuencias clínicas o distributivas.
      </p>

      <aside className="health-reading-note">
        <strong>Revisar no es simplemente hacer clic</strong>
        <p>Para que la supervisión sea real, la persona necesita comprender la salida, acceder a la evidencia, disponer de tiempo suficiente y poder disentir sin que el diseño del sistema la empuje a confirmar.</p>
      </aside>

      <h2>Qué debería mirar la supervisión</h2>
      <p>
        El objeto de la revisión cambia según la escala. Frente a un caso se pregunta si las fuentes son correctas y si falta contexto. Durante la operación se buscan errores frecuentes, cambios en los datos y señales de degradación. Desde una perspectiva de salud pública hay que observar, además, si las equivocaciones o los beneficios se distribuyen de forma desigual.
      </p>
      <div className="health-table-wrap">
        <table className="health-table health-table-balanced">
          <caption>Preguntas de supervisión según la escala</caption>
          <thead><tr><th>Escala</th><th>Qué observar</th><th>Una pregunta orientadora</th></tr></thead>
          <tbody>
            <tr><th>Caso</th><td>Fuentes, información ausente, explicación y contexto.</td><td>¿Esta salida tiene sentido para esta persona?</td></tr>
            <tr><th>Operación</th><td>Incidentes, calibración, cambios en los datos y frecuencia de alertas.</td><td>¿El sistema sigue comportándose como fue validado?</td></tr>
            <tr><th>Población</th><td>Desempeño por región, edad, sexo, patología u otros grupos pertinentes.</td><td>¿Quién recibe los beneficios y quién concentra los errores?</td></tr>
            <tr><th>Gobernanza</th><td>Propósito, responsabilidades, privacidad y mecanismos de reclamo.</td><td>¿Quién puede explicar, corregir y detener?</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        Esta mirada muestra que human-in-the-loop no describe a una persona aislada frente a una pantalla. Describe una red de responsabilidades que incluye equipos clínicos, especialistas técnicos, instituciones y comunidades afectadas. La participación humana es valiosa no solo porque puede corregir una predicción, sino porque permite discutir qué cuenta como un error, qué consecuencias son aceptables y qué propósitos vale la pena automatizar.
      </p>
    </article>
  );
}

export default function HealthEditorialBody({ entry }: { entry: EditorialEntry }) {
  return entry.href === "/salud/human-in-the-loop"
    ? <HumanLoopArticle entry={entry} />
    : <FunctionsOfAIArticle entry={entry} />;
}
