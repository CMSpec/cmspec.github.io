type CourseKey = "algebra-lineal" | "ecuaciones-diferenciales" | "calculo-vectorial";

type SandboxExample = {
  title: string;
  code: string;
};

const examples: Record<CourseKey, SandboxExample[]> = {
  "algebra-lineal": [
    {
      title: "Prueba con vectores y matrices",
      code: `A = matrix([[1, 2], [3, 4]])
v = vector([2, -1])
print("A =")
show(A)
print("v =", v)
print("A·v =", A*v)`,
    },
    {
      title: "Determinante e inversa",
      code: `A = matrix(QQ, [[2, 1], [5, 3]])
print("det(A) =", A.det())
print("A inversa =")
show(A.inverse())
print("Comprobación:")
show(A*A.inverse())`,
    },
    {
      title: "Resuelve un sistema lineal",
      code: `A = matrix(QQ, [[1, 2], [3, -1]])
b = vector(QQ, [5, 4])
x = A.solve_right(b)
print("Solución x =", x)
print("Comprobación A·x =", A*x)`,
    },
    {
      title: "Independencia y espacio generado",
      code: `v1 = vector(QQ, [1, 0, 1])
v2 = vector(QQ, [0, 1, 1])
v3 = vector(QQ, [1, 1, 2])
M = matrix([v1, v2, v3])
print("Rango =", M.rank())
print("Base del espacio fila:", M.row_space().basis())`,
    },
    {
      title: "Aplica una transformación lineal",
      code: `T = matrix([[2, 1], [0, -1]])
v = vector([3, 2])
print("v =", v)
print("T(v) =", T*v)
show(T)`,
    },
    {
      title: "Calcula coordenadas en otra base",
      code: `# Las columnas de B son los vectores de la nueva base
B = matrix(QQ, [[1, 1], [1, -1]])
v = vector(QQ, [3, 1])
coordenadas = B.solve_right(v)
print("[v]_B =", coordenadas)
print("Reconstrucción:", B*coordenadas)`,
    },
  ],
  "ecuaciones-diferenciales": [
    {
      title: "Comprueba una solución separable",
      code: `var('x')
y = function('y')(x)
solucion = desolve(diff(y,x) == x*y, y, ics=[0,1])
show(solucion)`,
    },
    {
      title: "Resuelve una ecuación lineal",
      code: `var('x')
y = function('y')(x)
show(desolve(diff(y,x) + 2*y == exp(x), y))`,
    },
    {
      title: "Explora un factor integrante",
      code: `var('x')
p = 2/x
mu = exp(integral(p, x)).simplify_full()
print("Factor integrante:")
show(mu)`,
    },
    {
      title: "Resuelve una ecuación de Bernoulli",
      code: `var('x')
y = function('y')(x)
show(desolve(diff(y,x) + y == x*y^2, y, contrib_ode=True))`,
    },
    {
      title: "Ecuación de segundo orden",
      code: `var('x')
y = function('y')(x)
show(desolve(diff(y,x,2) - 3*diff(y,x) + 2*y == 0, y))`,
    },
    {
      title: "Raíces de la ecuación característica",
      code: `var('r')
polinomio = r^2 - 3*r + 2
print("Raíces:", solve(polinomio == 0, r))
show(factor(polinomio))`,
    },
    {
      title: "Una solución particular",
      code: `var('x')
y = function('y')(x)
show(desolve(diff(y,x,2) + y == cos(2*x), y))`,
    },
    {
      title: "Transformada de Laplace",
      code: `var('t, s')
f = t^2*exp(-t)
F = laplace(f, t, s)
show(F)`,
    },
    {
      title: "Laplace inversa y función escalón",
      code: `var('t, s')
F = exp(-2*s)/(s^2 + 1)
show(inverse_laplace(F, s, t))`,
    },
    {
      title: "Sistema diferencial lineal",
      code: `A = matrix([[0, 1], [-2, -3]])
print("Valores propios:", A.eigenvalues())
print("Vectores propios:")
show(A.eigenvectors_right())`,
    },
    {
      title: "Aproxima una serie de Fourier",
      code: `var('x')
# Serie impar para f(x)=x en (-pi,pi)
S = sum(2*(-1)^(n+1)*sin(n*x)/n for n in (1..8))
plot(S, (x, -pi, pi), ymin=-4, ymax=4)`,
    },
  ],
  "calculo-vectorial": [
    {
      title: "Opera con vectores en R³",
      code: `u = vector([1, 2, -1])
v = vector([2, 0, 3])
print("u + v =", u+v)
print("u·v =", u.dot_product(v))
print("u×v =", u.cross_product(v))`,
    },
    {
      title: "Evalúa una función de varias variables",
      code: `var('x, y')
f(x,y) = x^2 + sin(x*y)
print("f(1,2) =", f(1,2))
plot3d(f, (x,-2,2), (y,-2,2))`,
    },
    {
      title: "Derivadas parciales",
      code: `var('x, y')
f = x^2*y + exp(x*y)
show(diff(f, x))
show(diff(f, y))`,
    },
    {
      title: "Gradiente y plano tangente",
      code: `var('x, y')
f = x^2 + x*y + y^2
gradiente = vector([diff(f,x), diff(f,y)])
print("Gradiente en (1,2):", gradiente(x=1,y=2))`,
    },
    {
      title: "Busca puntos críticos",
      code: `var('x, y')
f = x^3 - 3*x + y^2
criticos = solve([diff(f,x)==0, diff(f,y)==0], [x,y])
print(criticos)`,
    },
    {
      title: "Curva, velocidad y curvatura",
      code: `var('t')
r = vector([cos(t), sin(t), t/3])
velocidad = diff(r, t)
print("r'(t) =", velocidad)
parametric_plot3d(r, (t,0,4*pi))`,
    },
    {
      title: "Integral doble",
      code: `var('x, y')
f = x + y
resultado = integral(integral(f, y, 0, 1), x, 0, 2)
print("Integral =", resultado)`,
    },
    {
      title: "Cambio a coordenadas polares",
      code: `var('r, theta')
f = r^2
resultado = integral(integral(f*r, r, 0, 1), theta, 0, 2*pi)
print("Integral sobre el disco =", resultado)`,
    },
    {
      title: "Integral triple",
      code: `var('x, y, z')
resultado = integral(integral(integral(x+y+z, z,0,1), y,0,1), x,0,1)
print("Integral =", resultado)`,
    },
    {
      title: "Campo y potencial",
      code: `var('x, y')
phi = x^2*y + y^3
F = vector([diff(phi,x), diff(phi,y)])
print("Campo gradiente:", F)
show(phi)`,
    },
    {
      title: "Comprueba el teorema de Green",
      code: `var('x, y, r, theta')
P = -y
Q = x
integrando = diff(Q,x) - diff(P,y)
print("Rotacional escalar =", integrando)
print("Integral sobre el disco unidad =", integral(integral(integrando*r, r,0,1), theta,0,2*pi))`,
    },
  ],
};

export function getSageSandbox(course: CourseKey, chapterIndex: number, fallbackTitle: string) {
  return examples[course][chapterIndex] ?? {
    title: `Explora ${fallbackTitle.toLocaleLowerCase("es")}`,
    code: "# Escribe aquí tus comandos de SageMath\n2 + 2",
  };
}
