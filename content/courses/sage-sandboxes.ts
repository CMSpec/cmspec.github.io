type CourseKey = "algebra-lineal" | "ecuaciones-diferenciales" | "calculo-vectorial";
type SandboxExample = { title: string; code: string };

const algebra: SandboxExample[] = [
  ["Prueba con vectores y matrices", `import sympy as sp
A = sp.Matrix([[1, 2], [3, 4]])
v = sp.Matrix([2, -1])
print("A ="); print(A)
print("v =", list(v))
print("A·v =", list(A*v))`],
  ["Determinante e inversa", `import sympy as sp
A = sp.Matrix([[2, 1], [5, 3]])
print("det(A) =", A.det())
print("A inversa ="); print(A.inv())
print("Comprobación ="); print(A*A.inv())`],
  ["Resuelve un sistema lineal", `import sympy as sp
A = sp.Matrix([[1, 2], [3, -1]])
b = sp.Matrix([5, 4])
x = A.inv()*b
print("Solución x =", list(x))
print("Comprobación A·x =", list(A*x))`],
  ["Independencia y espacio generado", `import sympy as sp
M = sp.Matrix([[1,0,1], [0,1,1], [1,1,2]])
print("Rango =", M.rank())
print("Base del espacio fila:", M.rowspace())`],
  ["Aplica una transformación lineal", `import sympy as sp
T = sp.Matrix([[2, 1], [0, -1]])
v = sp.Matrix([3, 2])
print("v =", list(v))
print("T(v) =", list(T*v))`],
  ["Calcula coordenadas en otra base", `import sympy as sp
B = sp.Matrix([[1, 1], [1, -1]])
v = sp.Matrix([3, 1])
coordenadas = B.inv()*v
print("[v]_B =", list(coordenadas))
print("Reconstrucción =", list(B*coordenadas))`],
].map(([title, code]) => ({ title, code }));

const edoTitles = [
  "Comprueba una solución separable", "Resuelve una ecuación lineal", "Explora un factor integrante",
  "Resuelve una ecuación de Bernoulli", "Ecuación de segundo orden", "Raíces de la ecuación característica",
  "Una solución particular", "Transformada de Laplace", "Laplace inversa y función escalón",
  "Sistema diferencial lineal", "Aproxima una serie de Fourier",
];
const edoCodes = [
`import sympy as sp
x = sp.symbols('x'); y = sp.Function('y')
print(sp.dsolve(sp.diff(y(x),x) - x*y(x), ics={y(0):1}))`,
`import sympy as sp
x = sp.symbols('x'); y = sp.Function('y')
print(sp.dsolve(sp.diff(y(x),x) + 2*y(x) - sp.exp(x)))`,
`import sympy as sp
x = sp.symbols('x', positive=True)
p = 2/x
print("Factor integrante =", sp.exp(sp.integrate(p,x)))`,
`import sympy as sp
x = sp.symbols('x'); y = sp.Function('y')
print(sp.dsolve(sp.diff(y(x),x) + y(x) - x*y(x)**2))`,
`import sympy as sp
x = sp.symbols('x'); y = sp.Function('y')
print(sp.dsolve(sp.diff(y(x),x,2)-3*sp.diff(y(x),x)+2*y(x)))`,
`import sympy as sp
r = sp.symbols('r'); p = r**2-3*r+2
print("Raíces =", sp.solve(p,r)); print("Factorización =", sp.factor(p))`,
`import sympy as sp
x = sp.symbols('x'); y = sp.Function('y')
print(sp.dsolve(sp.diff(y(x),x,2)+y(x)-sp.cos(2*x)))`,
`import sympy as sp
t,s = sp.symbols('t s', positive=True)
print(sp.laplace_transform(t**2*sp.exp(-t),t,s,noconds=True))`,
`import sympy as sp
t,s = sp.symbols('t s', positive=True)
print(sp.inverse_laplace_transform(sp.exp(-2*s)/(s**2+1),s,t))`,
`import sympy as sp
A = sp.Matrix([[0,1],[-2,-3]])
print("Valores propios =", A.eigenvals())
print("Vectores propios =", A.eigenvects())`,
`import sympy as sp
x,n = sp.symbols('x n')
S = sum(2*(-1)**(k+1)*sp.sin(k*x)/k for k in range(1,9))
print("S₈(x) =", sp.simplify(S))`,
];
const edo = edoTitles.map((title, index) => ({ title, code: edoCodes[index] }));

const vectorTitles = ["Opera con vectores en R³","Evalúa una función de varias variables","Derivadas parciales","Gradiente y plano tangente","Busca puntos críticos","Curva, velocidad y curvatura","Integral doble","Cambio a coordenadas polares","Integral triple","Campo y potencial","Comprueba el teorema de Green"];
const vectorCodes = [
`import sympy as sp
u=sp.Matrix([1,2,-1]); v=sp.Matrix([2,0,3])
print("u+v =",list(u+v)); print("u·v =",u.dot(v)); print("u×v =",list(u.cross(v)))`,
`import sympy as sp
x,y=sp.symbols('x y'); f=x**2+sp.sin(x*y)
print("f(1,2) =",f.subs({x:1,y:2}))`,
`import sympy as sp
x,y=sp.symbols('x y'); f=x**2*y+sp.exp(x*y)
print("∂f/∂x =",sp.diff(f,x)); print("∂f/∂y =",sp.diff(f,y))`,
`import sympy as sp
x,y=sp.symbols('x y'); f=x**2+x*y+y**2
g=sp.Matrix([sp.diff(f,x),sp.diff(f,y)])
print("Gradiente en (1,2) =",list(g.subs({x:1,y:2})))`,
`import sympy as sp
x,y=sp.symbols('x y'); f=x**3-3*x+y**2
print(sp.solve([sp.diff(f,x),sp.diff(f,y)],[x,y]))`,
`import sympy as sp
t=sp.symbols('t'); r=sp.Matrix([sp.cos(t),sp.sin(t),t/3])
print("r'(t) =",list(sp.diff(r,t)))`,
`import sympy as sp
x,y=sp.symbols('x y'); f=x+y
print("Integral =",sp.integrate(f,(y,0,1),(x,0,2)))`,
`import sympy as sp
r,theta=sp.symbols('r theta', positive=True)
print("Integral sobre el disco =",sp.integrate(r**2*r,(r,0,1),(theta,0,2*sp.pi)))`,
`import sympy as sp
x,y,z=sp.symbols('x y z')
print("Integral =",sp.integrate(x+y+z,(z,0,1),(y,0,1),(x,0,1)))`,
`import sympy as sp
x,y=sp.symbols('x y'); phi=x**2*y+y**3
F=sp.Matrix([sp.diff(phi,x),sp.diff(phi,y)])
print("Campo gradiente =",list(F))`,
`import sympy as sp
x,y,r,theta=sp.symbols('x y r theta'); P=-y; Q=x
rot=sp.diff(Q,x)-sp.diff(P,y)
print("Rotacional escalar =",rot)
print("Integral en el disco =",sp.integrate(rot*r,(r,0,1),(theta,0,2*sp.pi)))`,
];
const vectorial = vectorTitles.map((title,index)=>({title,code:vectorCodes[index]}));

const examples: Record<CourseKey, SandboxExample[]> = { "algebra-lineal": algebra, "ecuaciones-diferenciales": edo, "calculo-vectorial": vectorial };
export function getSageSandbox(course: CourseKey, chapterIndex: number, fallbackTitle: string) {
  return examples[course][chapterIndex] ?? { title: `Explora ${fallbackTitle.toLocaleLowerCase("es")}`, code: "print(2 + 2)" };
}
