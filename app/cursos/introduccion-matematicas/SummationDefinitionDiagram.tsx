/** Aclaraciones de la definición de sumatoria, junto a los símbolos que describen. */
export default function SummationDefinitionDiagram() {
  return <figure className="summation-definition-diagram" aria-label="Definición de sumatoria con aclaraciones">
    <svg className="summation-diagram-wide" viewBox="0 0 760 340" role="img" aria-labelledby="sum-wide-title sum-wide-desc">
      <title id="sum-wide-title">Cómo leer una sumatoria</title>
      <desc id="sum-wide-desc">Sigma indica sumar. i es el índice de suma, 1 es el índice inicial y n es el índice final. a sub i es el término que se evalúa para cada índice. La suma se desarrolla como a sub 1 más a sub 2 hasta a sub n, el último término.</desc>
      <defs><marker id="sum-arrow-wide" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9"/></marker></defs>
      <g className="summation-symbols" textAnchor="middle">
        <text x="290" y="178" fontSize="83">∑</text>
        <text x="290" y="102" fontSize="25" fontStyle="italic">n</text>
        <text x="290" y="208" fontSize="23"><tspan fontStyle="italic">i</tspan> = 1</text>
        <text x="352" y="162" fontSize="33"><tspan fontStyle="italic">a</tspan><tspan baselineShift="sub" fontSize="20">i</tspan></text>
        <text x="553" y="162" fontSize="30">= a<tspan baselineShift="sub" fontSize="18">1</tspan><tspan baselineShift="baseline"> + a</tspan><tspan baselineShift="sub" fontSize="18">2</tspan><tspan baselineShift="baseline"> + ⋯ + a</tspan><tspan baselineShift="sub" fontSize="18">n</tspan></text>
      </g>
      <g className="summation-arrows" markerEnd="url(#sum-arrow-wide)">
        <path d="M 185 110 Q 220 115 250 144"/>
        <path d="M 398 57 Q 322 51 295 83"/>
        <path d="M 120 247 Q 176 218 264 204"/>
        <path d="M 252 281 Q 308 258 312 213"/>
        <path d="M 474 260 Q 385 234 356 181"/>
        <path d="M 667 224 L 681 181"/>
      </g>
      <g className="summation-labels">
        <text x="32" y="83">Indica sumar<tspan x="32" dy="23">(sigma mayúscula)</tspan></text>
        <text x="408" y="43">n: índice final<tspan x="408" dy="23">Indica hasta dónde sumar.</tspan></text>
        <text x="24" y="255">i: variable o<tspan x="24" dy="23">índice de suma</tspan></text>
        <text x="197" y="306">1: índice inicial</text>
        <text x="421" y="286">aᵢ: argumento de suma<tspan x="421" dy="23">i-ésimo término de la sucesión</tspan></text>
        <text x="580" y="247">aₙ: último término</text>
      </g>
    </svg>
    <svg className="summation-diagram-narrow" viewBox="0 0 360 450" role="img" aria-labelledby="sum-narrow-title sum-narrow-desc">
      <title id="sum-narrow-title">Partes de la sumatoria</title>
      <desc id="sum-narrow-desc">Las flechas señalan sigma, el índice i, el límite inicial 1, el límite final n y el término a sub i. Debajo se muestra la expansión de la suma hasta a sub n.</desc>
      <defs><marker id="sum-arrow-narrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9"/></marker></defs>
      <g className="summation-symbols" textAnchor="middle">
        <text x="142" y="190" fontSize="83">∑</text>
        <text x="142" y="112" fontSize="25" fontStyle="italic">n</text>
        <text x="142" y="220" fontSize="23"><tspan fontStyle="italic">i</tspan> = 1</text>
        <text x="210" y="173" fontSize="35">a<tspan baselineShift="sub" fontSize="21">i</tspan></text>
        <text x="172" y="365" fontSize="29">= a<tspan baselineShift="sub" fontSize="18">1</tspan><tspan baselineShift="baseline"> + a</tspan><tspan baselineShift="sub" fontSize="18">2</tspan><tspan baselineShift="baseline"> + ⋯ + a</tspan><tspan baselineShift="sub" fontSize="18">n</tspan></text>
      </g>
      <g className="summation-arrows" markerEnd="url(#sum-arrow-narrow)">
        <path d="M 212 60 Q 153 64 143 91"/>
        <path d="M 58 111 Q 67 153 103 162"/>
        <path d="M 64 260 Q 84 231 116 216"/>
        <path d="M 191 301 Q 174 266 164 227"/>
        <path d="M 297 232 Q 252 218 219 187"/>
        <path d="M 271 407 L 291 382"/>
      </g>
      <g className="summation-labels">
        <text x="170" y="28">n: índice final<tspan x="170" dy="21">Hasta dónde sumar</tspan></text>
        <text x="12" y="70">Sigma:<tspan x="12" dy="21">indica sumar</tspan></text>
        <text x="12" y="283">i: índice<tspan x="12" dy="21">de suma</tspan></text>
        <text x="160" y="322">1: índice inicial</text>
        <text x="211" y="256">aᵢ: argumento<tspan x="211" dy="21">de suma; término</tspan><tspan x="211" dy="21">i-ésimo</tspan></text>
        <text x="171" y="434">aₙ: último término</text>
      </g>
    </svg>
    <figcaption>Sumamos los términos de la sucesión cuyos índices van de 1 a n. El índice final es n; el último término que sumamos es aₙ.</figcaption>
  </figure>;
}
