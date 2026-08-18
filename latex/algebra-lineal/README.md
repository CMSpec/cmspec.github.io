# Fuente LaTeX de Álgebra Lineal

Esta carpeta contiene la fuente editable del curso que aparece en CMSpec.

## Editar desde GitHub

1. Abre el capítulo que quieras modificar (`chap1.tex` a `chap6.tex`).
2. Presiona el ícono del lápiz, **Edit this file**.
3. Realiza la corrección y selecciona **Commit changes**.
4. Pide a Codex: **“Sincroniza Álgebra Lineal desde GitHub”**.

## Correspondencia con el sitio

- `chap1.tex`: Vectores y matrices
- `chap2.tex`: Determinantes e inversas
- `chap3.tex`: Sistemas lineales y diagonalización
- `chap4.tex`: Espacios vectoriales
- `chap5.tex`: Transformaciones lineales
- `chap6.tex`: Cambio de base

El comando `npm run course:sync` convierte estos seis capítulos con plasTeX y
actualiza el contenido web. Las animaciones interactivas se mantienen en los
componentes del sitio y se insertan junto al contenido convertido.

## Elegir qué aparece en el índice

Escribe esta línea inmediatamente antes del concepto que quieras incorporar:

```tex
\cmspecindice{Matriz}
```

El texto entre llaves será el nombre visible en el índice y el enlace llevará
al punto exacto donde colocaste la línea. Para quitar una entrada del índice,
elimina solamente `\cmspecindice{...}`; el contenido del apunte no se borra.

Cuando un capítulo contiene al menos una marca `\cmspecindice`, CMSpec muestra
solo las entradas seleccionadas de ese capítulo. Los capítulos todavía no
marcados conservan temporalmente su índice automático anterior.

## Mover animaciones y visualizaciones

Cada recurso interactivo aparece donde esté escrita su marca
`\cmspecvisual{...}`. Para moverlo, corta la línea completa, pégala entre los
dos párrafos donde quieras verlo y vuelve a sincronizar el curso.

Por ejemplo:

```tex
La traza es la suma de los elementos de la diagonal.

\cmspecvisual{traza}

\begin{ejem}
...
```

Las marcas disponibles son:

- `tabla-vector`: tabla que se transforma en vector fila.
- `exploracion-vector-01`: ponderación de un vector por un escalar.
- `exploracion-vector-02`: suma de dos vectores en el plano.
- `exploracion-vector-03`: combinaciones de dos vectores entre 0 y 1.
- `traza`: suma animada de la diagonal.
- `matrices-triangulares`: matrices triangular superior e inferior.
- `simetria`: matrices simétrica y antisimétrica.
- `suma-matrices`: suma entrada por entrada.
- `producto-escalar-matriz`: multiplicación de una matriz por un escalar.
- `producto-punto`: producto punto coordenada por coordenada.
- `producto-matrices`: producto entre filas y columnas.
- `reduccion-filas`: operaciones elementales.
- `cambio-de-base`: cambio de base en el plano.

Usa cada marca una sola vez. Debe ir en una línea independiente y fuera de
ambientes como `defin`, `ejem`, `ejer`, `enumerate` o `itemize`.
