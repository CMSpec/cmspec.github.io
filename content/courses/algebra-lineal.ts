/*
 * Estructura inicial obtenida únicamente de la carpeta Apuntes
 * del proyecto Clases_algebra_lineal.
 */

export const linearAlgebraCourse = {
  title: "Álgebra Lineal",
  author: "Camila Muñoz Santander",
  eyebrow: "CURSO DE PREGRADO · APUNTES",
  introduction:
    "Un recorrido por las ideas fundamentales del álgebra lineal, desde vectores y matrices hasta transformaciones lineales y cambios de base.",
  note: "Esta primera versión organiza el contenido de los apuntes originales. Las lecciones completas y las visualizaciones se incorporarán progresivamente.",
  units: [
    {
      number: "01",
      title: "Vectores y matrices",
      description: "El lenguaje matricial y las operaciones que sostienen el curso.",
      topics: [
        "Definiciones generales",
        "Adición y multiplicación por un escalar",
        "Ecuaciones matriciales",
        "Multiplicación de matrices",
        "Inversa de una matriz",
        "Operaciones elementales y matrices escalonadas",
        "Rango de una matriz",
      ],
    },
    {
      number: "02",
      title: "Determinantes e inversas",
      description: "Determinantes, matriz adjunta y cálculo de inversas.",
      topics: ["Determinantes", "Regla de Sarrus", "Matriz adjunta", "Cálculo de la inversa"],
    },
    {
      number: "03",
      title: "Sistemas lineales y diagonalización",
      description: "Métodos de resolución y estructura de los sistemas de ecuaciones.",
      topics: [
        "Introducción a los sistemas lineales",
        "Métodos directos",
        "Sistemas de m ecuaciones con n incógnitas",
        "Regla de Cramer",
        "Sistemas lineales homogéneos",
        "Diagonalización de matrices",
      ],
    },
    {
      number: "04",
      title: "Espacios vectoriales",
      description: "La estructura abstracta detrás de vectores, bases y geometría.",
      topics: [
        "Definición y propiedades básicas",
        "Subespacios vectoriales",
        "Combinación e independencia lineal",
        "Espacio generado",
        "Bases y dimensión",
        "Producto interno y espacios euclídeos",
        "Proyección ortogonal",
        "Proceso de Gram–Schmidt",
      ],
    },
    {
      number: "05",
      title: "Transformaciones lineales",
      description: "Funciones que preservan la estructura de los espacios vectoriales.",
      topics: ["Definición de transformación lineal", "Núcleo", "Imagen"],
    },
    {
      number: "06",
      title: "Cambio de base",
      description: "Distintas coordenadas para representar una misma estructura.",
      topics: [
        "Matriz de cambio de base",
        "Rango y nulidad",
        "Espacio fila",
        "Espacio columna",
      ],
    },
  ],
} as const;
