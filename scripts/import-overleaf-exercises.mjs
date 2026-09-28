// Lee archivos como datos: nunca ejecuta TeX ni extrae rutas del ZIP al disco.
// Falla de forma cerrada ante notación o recursos que requieren revisión editorial.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import katex from "katex";
import { overleafGuidance } from "../content/overleaf-guidance.ts";

const python = process.env.OVERLEAF_PYTHON || "python3";
const archive = process.argv[2];
if (!archive) throw Error("Indica el ZIP exportado desde Overleaf");
const sources = JSON.parse(execFileSync(python, ["-c", String.raw`
import zipfile,io,json,sys
outer=zipfile.ZipFile(sys.argv[1]); result=[]
for project in outer.infolist():
 if not project.filename.endswith('.zip'): continue
 if project.file_size>50_000_000: raise ValueError('Proyecto demasiado grande')
 inner=zipfile.ZipFile(io.BytesIO(outer.read(project)))
 for f in inner.infolist():
  if not f.filename.endswith('.tex'): continue
  if f.file_size>2_000_000: raise ValueError('Fuente demasiado grande')
  result.append(dict(project=project.filename,file=f.filename,tex=inner.read(f).decode('utf-8')))
print(json.dumps(result,ensure_ascii=False))
`, archive], { maxBuffer: 10 * 1024 * 1024 }).toString());

const courseNames = { "algebra-lineal": "Álgebra Lineal", "introduccion-matematicas": "Introducción a las Matemáticas", "calculo-diferencial": "Cálculo Diferencial", "calculo-vectorial": "Cálculo Vectorial", "ecuaciones-diferenciales": "Ecuaciones Diferenciales" };
const reviewed = JSON.parse(readFileSync("content/overleaf-reviewed.json", "utf8"));
const macros = {R:"\\mathbb{R}",N:"\\mathbb{N}",Z:"\\mathbb{Z}",Q:"\\mathbb{Q}",C:"\\mathbb{C}",F:"\\mathbb{F}",sen:"\\sin",tg:"\\tan",arctg:"\\arctan",calM:"\\mathcal{M}",calP:"\\mathcal{P}"};
const audit = []; const accepted=[]; const seen=new Map();
function stripComments(tex) {return tex.replace(/(?<!\\)%[^\n]*/g, "");}
function math(tex) {
  tex=tex.replace(/\\(?:R|N|Z|Q|C|F|sen|tg|arctg|calM|calP)\b/g, cmd=>macros[cmd.slice(1)])
    .replace(/\\(?:mathbbm|mathds)\b/g,"\\mathbb")
    .replace(/\\(?:label|tag)\{[^}]*\}/g,"")
    .replace(/\\hspace\{[^}]*\}/g,"\\quad ")
    .replace(/\$(.*?)\$/g,"$1").replace(/\s+/g," ").trim();
  katex.renderToString(tex,{throwOnError:true,strict:"error",trust:false});
  return tex;
}
function convert(raw) {
  if (/\\(?:includegraphics|input|include|href|url|verb|lstinputlisting)|\\begin\{(?:tikzpicture|tabular|tabularx|verbatim|lstlisting|picture)/.test(raw)) throw Error("Recurso gráfico, tabla, código o archivo externo");
  const formulas=[];
  let text="";
  for(let i=0;i<raw.length;) {
    const rest=raw.slice(i);
    const env=rest.match(/^\\begin\{(equation\*?|align\*?|eqnarray\*?)\}/);
    const start=env?.[0] ?? (["$$","\\[","\\(","$"].find(s=>rest.startsWith(s)));
    if(start && (i===0||raw[i-1]!=="\\")) {
      const end=env?`\\end{${env[1]}}`:start==="\\["?"\\]":start==="\\("?"\\)":start;
      let j=i+start.length, depth=0, stop=-1;
      for(;j<raw.length;j++) {
        if(depth===0&&raw.startsWith(end,j)){stop=j;break;}
        if(raw[j]==="{"&&raw[j-1]!=="\\")depth++;
        if(raw[j]==="}"&&raw[j-1]!=="\\")depth--;
      }
      if(stop<0) throw Error("Fórmula sin cerrar");
      let expr=raw.slice(i+start.length,stop);
      if(env&&env[1].startsWith("align"))expr=`\\begin{aligned}${expr}\\end{aligned}`;
      if(env&&env[1].startsWith("eqnarray"))expr=`\\begin{aligned}${expr.replace(/&\s*=/g,"&=").replace(/=\s*&/g,"=")}\\end{aligned}`;
      const display=!!env||start==="$$"||start==="\\[";
      formulas.push((display?"$$":"$")+math(expr)+(display?"$$":"$"));
      text+=` FORMULA${formulas.length-1}TOKEN `;i=stop+end.length;
    } else {text+=raw[i++];}
  }
  let item=0;
  text=text.replace(/\\begin\{(?:enumerate|itemize|parts|subparts)\}(?:\[[^\]]*\])?/g,"\n")
    .replace(/\\end\{(?:enumerate|itemize|parts|subparts)\}/g,"\n")
    .replace(/\\begin\{multicols\}\{\d+\}|\\end\{multicols\}/g,"")
    .replace(/\\(?:item|part|subpart)\b(?:\[[^\]]*\])?/g,()=>`\n${++item}. `)
    .replace(/\\(?:vspace|hspace)\*?\{[^}]*\}/g," ")
    .replace(/\\(?:newpage|clearpage|medskip|smallskip|bigskip|noindent|par|hfill|vfill|centering|displaystyle)\b/g," ")
    .replace(/\\(?:textbf|textit|emph|underline|textrm|textnormal)\{([^{}]*)\}/g,"$1")
    .replace(/\{\\(?:bfseries|bf|it|large|small)\s+([^{}]*)\}/g,"$1")
    .replace(/\\['´]\{?([aeiouAEIOU])\}?/g,(_,c)=>({a:"á",e:"é",i:"í",o:"ó",u:"ú",A:"Á",E:"É",I:"Í",O:"Ó",U:"Ú"}[c]))
    .replace(/\\~\{?n\}?/g,"ñ")
    .replace(/\\\\(?:\[[^\]]*\])?/g,"\n")
    .replace(/\\(?:puntos|points)\{[^}]*\}/g,"")
    .replace(/\[\s*\d+\s*(?:puntos?|pts?\.?|ptos?\.?)\s*\]|\(\s*\d+\s*(?:puntos?|pts?\.?|ptos?\.?)\s*\)/gi,"")
    .replace(/~/g," ");
  if(/\\|[{}]|\$/.test(text)) throw Error("Comando de texto o agrupación por revisar: "+text.match(/.{0,15}[\\{}$].{0,45}/)?.[0]);
  if(/puntaje|puntos cada|en clases|control|examen|solemne|matlab|octave|geogebra/i.test(text))throw Error("Instrucción de evaluación o dependencia de software");
  text=text.replace(/FORMULA(\d+)TOKEN/g,(_,i)=>formulas[+i]);
  return text.split(/\n/).map(s=>s.replace(/\s+/g," ").trim()).filter(Boolean);
}
function chunks(tex) {
  tex=stripComments(tex);
  tex=tex.split("\\begin{document}")[1]??tex;
  tex=tex.split("\\end{document}")[0];
  tex=tex.split(/\\section\*?\{\s*(?:Respuestas|Soluciones)/i)[0];
  const tokens=/\\(begin|end)\{(questions|enumerate|itemize|solution\*?|parts|subparts)\}|\\(question|item)\b(?:\[[^\]]*\])?/g;
  let stack=[], begin=-1, result=[];
  for(const m of tex.matchAll(tokens)) {
    if(m[1]==="begin")stack.push(m[2]);
    else if(m[1]==="end") {
      if(stack.length===1&&begin>=0){result.push(tex.slice(begin,m.index));begin=-1;}
      if(stack.at(-1)!==m[2])throw Error("Listas anidadas sin balancear");
      stack.pop();
    } else if(stack.length===1&&((m[3]==="question"&&stack[0]==="questions")||(m[3]==="item"&&stack[0]==="enumerate"))) {
      if(begin>=0)result.push(tex.slice(begin,m.index));
      begin=m.index+m[0].length;
    }
  }
  if(stack.length)throw Error("Lista sin cerrar");
  return result;
}
function classify(source,question) {
  const p=source.project, all=source.tex;
  const course=/ecuación diferencial/i.test(question)?"ecuaciones-diferenciales":p==="Matemáticas.zip"||p==="Algebra.zip"?"introduccion-matematicas":p==="Diferencial.zip"?"calculo-diferencial":p==="Vectorial.zip"?"calculo-vectorial":/Cálculo Vectorial/i.test(all)?"calculo-vectorial":/Cálculo Diferencial/i.test(all)?"calculo-diferencial":"algebra-lineal";
  const tests=course==="ecuaciones-diferenciales"?[[/valores iniciales/,"Sustitución lineal","clase-4-seccion-1"],[/.*/,"Ecuaciones lineales de primer orden","clase-2-seccion-2"]]:course==="algebra-lineal"?[
    [/transforma|núcleo|nucleo|imagen|Ker\(|Im\(/i,"Transformaciones lineales","unidad-5-seccion-2"],
    [/propio|diagonaliza|autovalor/i,"Valores propios y diagonalización","unidad-3-seccion-8"],
    [/ortonormal|ortogonal|producto interno|Gram/i,"Ortogonalidad","unidad-4-seccion-11"],
    [/base|bases|dimensi|subespacio|vectorial|independi|generad|combinaci/i,"Espacios vectoriales","unidad-4-seccion-3"],
    [/sistema|Cramer|Gauss/i,"Sistemas lineales","unidad-3-seccion-1"],
    [/determinante|\\det|inversa|invertible/i,"Determinantes e inversas","unidad-2-seccion-2"],
    [/.*/,"Matrices y operaciones","unidad-1-seccion-3"]]:course==="calculo-diferencial"?[
    [/optim|máxim|mínim|maxim|minim|costo|volumen|razón|rapidez/i,"Aplicaciones de la derivada","aplicaciones-seccion-3"],
    [/paramétrica|parametrica/i,"Curvas paramétricas","inversa-parametricas-seccion-2"],
    [/deriv|tangente|normal|diferenci|f'|g'/i,"Derivadas","reglas-seccion-1"],
    [/asínt|asint/i,"Asíntotas","limites-seccion-3"],
    [/lim|continu/i,"Límites y continuidad","limites-seccion-2"],
    [/tiene solución entre/i,"Límites y continuidad","limites-seccion-2"],
    [/.*/,"Funciones y dominio","funciones-seccion-1"]]:course==="calculo-vectorial"?[
    [/trabajo realizado|fuerzas constantes/i,"Campos conservativos","clase-10-seccion-4"],
    [/masa|resorte/i,"Integrales de línea","clase-10-seccion-1"],
    [/integral|\\int/i,"Integrales","clase-7-seccion-3"],
    [/gradiente|parcial|extremo|crítico|critico/i,"Derivadas y extremos","clase-5-seccion-1"],
    [/curva|curvatura|parametri/i,"Curvas parametrizadas","clase-6-seccion-1"],
    [/.*/,"Geometría y funciones de varias variables","clase-1-seccion-6"]]:[
    [/fracciones parciales/i,"Fracciones parciales","intro-polinomios-6"],
    [/complej|\\mathbb\{C\}|argumento|polar|[0-9]i|bi\$|\\overline\{z/i,"Números complejos","intro-complejos-1"],
    [/polinom|raíces|raices|divisi[oó]n/i,"Polinomios","intro-polinomios-1"],
    [/binom|combinatorio|progresi|\bPA\b|\bPG\b|P\.A\./i,"Progresiones y binomio","intro-progresiones-binomio-1"],
    [/inducci|sumatoria|\\sum|sucesi/i,"Inducción y sumatorias","intro-induccion-sumatorias-1"],
    [/parábola|circunferencia|hipérbola|elipse/i,"Geometría analítica","intro-geometria-analitica-1"],
    [/vector|producto punto/i,"Vectores","intro-vectores-1"],
    [/trigonom|\\sin|\\cos|\\tan|triángul|triangul|ángulo|elevación/i,"Trigonometría","intro-trigonometria-1"],
    [/proposici|lógica|logica|verdad|cuantificador/i,"Lógica","intro-logica-1"],
    [/encuesta|preferencia|personas/i,"Conjuntos","intro-conjuntos-1"],
    [/conjunto|\\cup|\\cap|\\subset|\\setminus/i,"Conjuntos","intro-conjuntos-1"],
    [/proposici|lógica|logica|verdad|cuantificador/i,"Lógica","intro-logica-1"],
    [/funci|dominio|recorrido|inyectiva|sobreyectiva/i,"Funciones","intro-funciones-1"],
    [/.*/,"Ecuaciones y álgebra","intro-ecuaciones-1"]];
  const [,topic,anchor]=tests.find(([re])=>re.test(question));return {course,topic,anchor};
}
for(const source of sources) {
  let items;
  try {items=chunks(source.tex);}catch(error){audit.push({project:source.project,file:source.file,status:"revisar",reason:error.message});continue;}
  if(!items.length)audit.push({project:source.project,file:source.file,status:"sin ejercicios separables"});
  items.forEach((raw,index)=>{
    const ref={project:source.project,file:source.file,item:index+1};
    try {
      const solutions=[];
      raw=raw.replace(/\\begin\{solution\*?\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{solution\*?\}/g,(_,s)=>{solutions.push(s);return "";});
      if(/\\(?:section|subsection)|Respuestas|Soluci[oó]n\s*:/i.test(raw))throw Error("Mezcla de enunciado y respuesta o cambio de tema");
      let statement=convert(raw); const solution=solutions.flatMap(convert).map(body=>({body}));
      const joined=statement.join(" ");
      if(joined.length<30||!/[a-záéíóúñ]{3}/i.test(joined.replace(/\$.*?\$/g,"")))throw Error("Enunciado depende de una instrucción anterior");
      const key=joined.replace(/\s+/g,"");
      const hash=createHash("sha256").update(key).digest("hex").slice(0,12);
      if(!reviewed[hash])throw Error("Pendiente de revisión editorial: contexto, notación o validez matemática");
      // Corrección solicitada: la intersección es el subespacio cero, no el conjunto vacío.
      if(reviewed[hash].zeroIntersection) {
        statement=statement.map(text=>text.replace(/\\emptyset\b/g,"\\{0_V\\}"));
        statement.push("Aquí $0_V$ denota el vector cero del espacio $V$.");
      }
      statement=statement.map(text=>text.replace(/\([Xx]+ puntos\)/g,"").replace(/\\operatorname\{\s*sen\}/g,"\\sin").replace(/\\operatorname\{cotg\}|\\cotg\b/g,"\\cot").replace(/\?`/g,"¿").replace(/Encuentre en núcleo/g,"Encuentre el núcleo").trim());
      if(seen.has(hash)){audit.push({...ref,status:"duplicado",duplicateOf:seen.get(hash)});return;}
      const {course,topic,anchor}=classify(source,joined);
      const slug=`practica-${course}-${hash}`;
      seen.set(hash,slug);
      accepted.push({slug,number:String(15+accepted.length).padStart(2,"0"),course:courseNames[course],courseSlug:course,collection:"Ejercicios",title:`${topic} · ${accepted.filter(e=>e.courseSlug===course&&e.topic===topic).length+1}`,topic,difficulty:"Sin clasificar",estimatedTime:"A tu ritmo",statement,relatedTheory:[{label:topic,href:`/cursos/${course}#${anchor}`}],hints:[],solution,finalAnswer:"",commonMistake:"",...(source.project.startsWith("Ejercicios Algebra Lineal")?{sourceCredit:"Héctor del Castillo · Universidad de Santiago de Chile (según la guía original)"}:{} ),...overleafGuidance[hash]});
      audit.push({...ref,status:"incorporado",slug,solution:accepted.at(-1).solution.length>0,solutionOrigin:overleafGuidance[hash]?.solution ? "desarrollo editorial para la web" : solution.length ? "fuente" : null});
    }catch(error){audit.push({...ref,status:"revisar",reason:error.message});}
  });
}
function patch(file, text) {
  const old=existsSync(file)?readFileSync(file,"utf8"):null;
  const diff=old===null?`*** Add File: ${file}\n${text.trimEnd().split("\n").map(l=>"+"+l).join("\n")}`:`*** Update File: ${file}\n@@\n${old.trimEnd().split("\n").map(l=>"-"+l).join("\n")}\n${text.trimEnd().split("\n").map(l=>"+"+l).join("\n")}`;
  execFileSync("apply_patch",[],{input:`*** Begin Patch\n${diff}\n*** End Patch\n`,maxBuffer:10*1024*1024});
}
patch("content/overleaf-exercises.ts",`import type { Exercise } from "./exercises";\n\n// Importación conservadora; trazabilidad privada en work/overleaf-import-audit.json.\nexport const overleafExercises: Exercise[] = ${JSON.stringify(accepted,null,2)};\n`);
patch("work/overleaf-import-audit.json",JSON.stringify(audit,null,2)+"\n");
console.log(JSON.stringify({sources:sources.length,exercises:accepted.length,withSolutions:accepted.filter(e=>e.solution.length).length,review:audit.filter(e=>e.status==="revisar").length,duplicates:audit.filter(e=>e.status==="duplicado").length,courses:Object.fromEntries(Object.keys(courseNames).map(c=>[c,accepted.filter(e=>e.courseSlug===c).length]))},null,2));
