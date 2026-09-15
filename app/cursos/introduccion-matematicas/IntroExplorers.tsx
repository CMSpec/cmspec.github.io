"use client";
import { useState } from "react";

export function LogicExplorer() {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const truth = (value: boolean) => value ? "V" : "F";
  return <div className="intro-explorer">
    <h5>Explora los valores de verdad</h5>
    <div className="intro-controls"><label><input type="checkbox" checked={p} onChange={event => setP(event.target.checked)} /> p es verdadera</label><label><input type="checkbox" checked={q} onChange={event => setQ(event.target.checked)} /> q es verdadera</label></div>
    <div className="intro-table-scroll"><table><caption>Tabla de verdad · la fila seleccionada está resaltada</caption><thead><tr>{["p", "q", "¬p", "p ∧ q", "p ∨ q", "p ⇒ q", "p ⇔ q"].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{[[true,true],[true,false],[false,true],[false,false]].map(([a,b],i) => <tr key={i} className={a === p && b === q ? "is-selected" : ""}>{[a,b,!a,a&&b,a||b,!a||b,a===b].map((value,j)=><td key={j}>{truth(value)}</td>)}</tr>)}</tbody></table></div>
    <p role="status">Con p {p ? "verdadera" : "falsa"} y q {q ? "verdadera" : "falsa"}, la implicación es {!p || q ? "verdadera" : "falsa"}.</p>
  </div>;
}

export function UnitCircleExplorer() {
  const [degrees, setDegrees] = useState(45);
  const radians = degrees * Math.PI / 180;
  const x = Math.cos(radians), y = Math.sin(radians);
  const px = 200 + 130*x, py = 180 - 130*y;
  const format = (v:number) => Math.abs(v) < 0.0005 ? "0.000" : v.toFixed(3);
  return <div className="intro-explorer">
    <h5>Un ángulo, dos coordenadas</h5>
    <svg viewBox="0 0 400 360" role="img" aria-label={`Circunferencia unitaria: ángulo ${degrees} grados, coseno ${format(x)}, seno ${format(y)}`} style={{width:"100%",maxHeight:350}}>
      <line x1="25" y1="180" x2="375" y2="180" stroke="#aaa"/><line x1="200" y1="15" x2="200" y2="345" stroke="#aaa"/>
      <circle cx="200" cy="180" r="130" fill="none" stroke="#254b56" strokeWidth="2"/>
      <line x1="200" y1="180" x2={px} y2={py} stroke="#254b56" strokeWidth="3"/>
      <line x1="200" y1="180" x2={px} y2="180" stroke="#c46643" strokeWidth="5"/>
      <line x1={px} y1="180" x2={px} y2={py} stroke="#438468" strokeWidth="5"/>
      <circle cx={px} cy={py} r="6" fill="#254b56"/>
      <text x="342" y="174">x</text><text x="210" y="24">y</text><text x="206" y="199">0</text><text x="322" y="202">1</text><text x="62" y="202">−1</text>
    </svg>
    <label className="intro-angle">Ángulo: {degrees}° <input type="range" min="-360" max="360" step="1" value={degrees} onChange={event => setDegrees(Number(event.target.value))}/></label>
    <p role="status">t = {format(radians)} rad · P = (cos t, sin t) = ({format(x)}, {format(y)})</p>
    <p>El segmento naranja muestra el coseno sobre el eje horizontal; el verde muestra el seno. Una vuelta completa devuelve el punto a la misma posición.</p>
  </div>;
}
