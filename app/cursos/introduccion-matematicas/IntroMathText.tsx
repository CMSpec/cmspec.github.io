import katex from "katex";

export default function IntroMathText({ text }: { text: string }) {
  return <>{text.split(/(\$[^$]+\$)/g).map((part, i) => part.startsWith("$") && part.endsWith("$")
    ? <span key={i} className="course-inline-math" dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(1, -1), { output: "mathml", throwOnError: true }) }}/>
    : part)}</>;
}
