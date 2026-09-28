import katex from "katex";

/** Solo interpreta fragmentos delimitados; el resto sigue siendo texto de React. */
export default function ExerciseMath({ text }: { text: string }) {
  return <>{text.split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g).map((part, index) => {
    const display = part.startsWith("$$") && part.endsWith("$$");
    const inline = part.startsWith("$") && part.endsWith("$");
    if (!inline) return part;
    return <span key={index} className={display ? "exercise-math-display" : "exercise-math-inline"} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(display ? 2 : 1, display ? -2 : -1), { displayMode: display, output: "mathml", throwOnError: true, trust: false }) }}/>;
  })}</>;
}
