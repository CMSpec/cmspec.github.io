// Guía entregada en LaTeX por la autora. Se conserva el orden de los 17 ejercicios.
const t = String.raw;
export const partialFractionCases = [
  { title: "1. Factores lineales distintos", text: "Si los factores lineales son distintos, escribimos una fracción con numerador constante para cada uno. En esta fórmula, a y b son distintos.", tex: t`\frac{P(x)}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}` },
  { title: "2. Factores lineales repetidos", text: "Si un factor lineal se repite, incluimos una fracción por cada potencia, desde la primera hasta la mayor. Aquí n es un entero positivo.", tex: t`\frac{P(x)}{(x-a)^n}=\frac{A_1}{x-a}+\frac{A_2}{(x-a)^2}+\cdots+\frac{A_n}{(x-a)^n}` },
  { title: "3. Factores cuadráticos irreducibles", text: "Si un factor cuadrático no se puede factorizar en los reales, su numerador es lineal. Para ax²+bx+c, esto exige a ≠ 0 y b²−4ac < 0. Puede combinarse con un factor lineal:", tex: t`\frac{P(x)}{(ax^2+bx+c)(x-d)}=\frac{A}{x-d}+\frac{Bx+C}{ax^2+bx+c}` },
  { title: "4. Factores cuadráticos irreducibles repetidos", text: "Incluimos una fracción por cada potencia del factor cuadrático irreducible, cada una con su propio numerador lineal. Algunos coeficientes pueden resultar cero.", tex: t`\begin{aligned}\frac{P(x)}{(ax^2+bx+c)^n}&=\frac{A_1x+B_1}{ax^2+bx+c}\\&\quad+\frac{A_2x+B_2}{(ax^2+bx+c)^2}\\&\quad+\cdots+\frac{A_nx+B_n}{(ax^2+bx+c)^n}\end{aligned}` },
];
export const partialFractionExercises = [
  t`\frac{3x+7}{x^2-x-6}`,
  t`\frac{2x-5}{x^2+4x-5}`,
  t`\frac{x+1}{x^2-9}`,
  t`\frac{x^2+1}{x^2-4x+4}`,
  t`\frac{5x-2}{x^3-3x^2+3x-1}`,
  t`\frac{4x+6}{x^2+2x+1}`,
  t`\frac{2x+1}{x^2+4}`,
  t`\frac{x^2-3x+5}{x^2+x+1}`,
  t`\frac{6x+7}{x^2+2x+5}`,
  t`\frac{3x+2}{(x^2+1)^2}`,
  t`\frac{x^2+x+2}{(x^2+4)^3}`,
  t`\frac{5x-1}{(x^2+x+1)^2}`,
  t`\frac{4x+3}{(x^2+1)(x-1)}`,
  t`\frac{2x^2+3x+1}{(x-2)^2(x+3)}`,
  t`\frac{5x+6}{(x^2+x+1)(x^2-1)}`,
  t`\frac{x^2+4}{(x-1)(x+2)^2(x^2+1)}`,
  t`\frac{7x+8}{(x^2+4)^2(x-3)}`,
];
