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

