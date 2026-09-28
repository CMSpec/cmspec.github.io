import assert from "node:assert/strict";
import test from "node:test";
import {exercises} from "../content/exercises.ts";
import {overleafExercises} from "../content/overleaf-exercises.ts";
import {generatePracticeTest, testAvailability, testPool, topicKey, isTestReady} from "../lib/practice-test.ts";

test("las pruebas respetan 1/2/2 y nunca repiten ejercicios",()=>{
  const topics=[...new Set(exercises.map(topicKey))];
  for(let seed=0;seed<30;seed++){
    let state=seed+1;
    const random=()=>{state=(state*1664525+1013904223)>>>0;return state/2**32;};
    const result=generatePracticeTest(exercises,topics,random);
    assert.equal(result.length,5);
    assert.equal(new Set(result.map(e=>e.slug)).size,5);
    assert.equal(new Set(result.map(e=>e.statement.join(" ").replace(/\s+/g,""))).size,5);
    assert.deepEqual(testAvailability(result),{Inicial:1,Intermedio:2,Desafío:2});
    assert.ok(result.every(isTestReady));
  }
});
test("el generador no cambia cuotas ni sale de los temas seleccionados",()=>{
  assert.deepEqual(generatePracticeTest(exercises,[]),[]);
  const trig="introduccion-matematicas::Trigonometría";
  const result=generatePracticeTest(exercises,[trig],()=>0.5);
  assert.equal(result.length,5);
  assert.ok(result.every(e=>topicKey(e)===trig));
  assert.deepEqual(generatePracticeTest(exercises,["tema inexistente"]),[]);
  assert.deepEqual(generatePracticeTest(exercises.filter(e=>e.difficulty!=="Desafío"),[trig]),[]);
});
test("la disponibilidad incluye solo contenido resuelto y clasificado",()=>{
  const sample=exercises[0];
  const variants=[{...sample,hints:[]},{...sample,solution:[]},{...sample,finalAnswer:""},{...sample,difficulty:"Sin clasificar"}];
  assert.equal(testPool(variants,[topicKey(sample)]).length,0);
  assert.equal(testPool([sample,{...sample,slug:"copia-del-mismo-enunciado"}],[topicKey(sample)]).length,1);
});
test("todos los ejercicios importados tienen ayudas completas y dificultad revisada",()=>{
  for(const e of overleafExercises){
    assert.ok(isTestReady(e),e.slug);
    assert.equal(e.hints.length,3,e.slug);
    if(e.topic==="Trigonometría")assert.match(e.title,/Ecuaci|Identidad|Problema|Función|Cálculo trigonométrico/);
  }
});

test("comprobaciones de sumatorias, polinomios y progresiones",()=>{
  assert.equal(Array.from({length:11},(_,i)=>5*i*(i+3)).reduce((a,b)=>a+b),2750);
  const sums=[0,1,-1].map(offset=>{let s=0;for(let i=1;i<=5;i++)for(let j=1;j<=i;j++)s+=(i+offset)*(j+1);return s;});
  assert.deepEqual(sums,[195,245,145]);
  for(const x of [-4,-2,0,2,4]){
    const actual=(7*x+8)/(x**5-3*x**4+2*x**3-6*x*x+x-3);
    const partial=29/(100*(x-3))-(29*x+87)/(100*(x*x+1))-(29*x+17)/(10*(x*x+1)**2);
    assert.ok(Math.abs(actual-partial)<1e-10);
    assert.equal((x-3)*(x*x+1)**2,x**5-3*x**4+2*x**3-6*x*x+x-3);
  }
  for(const n of [1,2,5,12]) {
    const sum=Array.from({length:n},(_,i)=>1/((i+2)*(i+3))).reduce((a,b)=>a+b,0);
    assert.ok(Math.abs(sum-n/(2*(n+2)))<1e-12);
  }
  assert.equal(16*(3/2)**9,19683/32);
});
test("comprobaciones numéricas de trigonometría",()=>{
  const rad=d=>d*Math.PI/180;
  assert.ok(Math.abs(50*Math.sin(rad(105))/Math.sin(rad(45))-25*(1+Math.sqrt(3)))<1e-10);
  assert.ok(Math.abs(40*(Math.tan(rad(38))-Math.tan(rad(35)))-3.243)<.0005);
  for(const [p,s,d] of [[2,3,2*Math.sqrt(5)],[4,5,12]])assert.ok(Math.abs(Math.atan((p+s)/d)-2*Math.atan(p/d))<1e-10);
  for(const x of [.2,.7,1.1]){
    assert.ok(Math.abs((Math.tan(x)-1/Math.tan(x))/(1-2*Math.cos(x)**2)-(Math.tan(x)+1/Math.tan(x)))<1e-10);
  }
});
test("verificar soluciones matriciales y tangentes",()=>{
  const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,a,k)=>s+a*B[k][j],0)));
  const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
  const tr=A=>A[0].map((_,j)=>A.map(row=>row[j]));
  const A=[[1,0],[1,1]],B=[[2,3],[2,3]],C=[[1,-1],[1,0]],D=[[2,1],[-1,0]],X=[[1.5,-.5],[1.5,3.5]],Y=[[.5,0],[3.5,-4]];
  assert.deepEqual(add(X,mul(A,tr(Y))),B);
  assert.deepEqual(add(tr(X),mul(Y,C)),D);
  assert.deepEqual(mul([[6,0,0],[0,1,2],[0,3,5]],[[.5,0,1/6],[-8,-15,-6],[5,9,4]]),[[3,0,1],[2,3,2],[1,0,2]]);
  for(const x of [-3,0,2])assert.equal(2*x+3,((x+1)**2+3*(x+1)-1-(x*x+3*x-1))-1);
});
