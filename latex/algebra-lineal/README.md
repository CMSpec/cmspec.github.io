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
