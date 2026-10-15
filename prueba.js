/* 
   CESAR JULIO CONTRERAS HERRERA
 ==============================================================
  PRUEBA TÉCNICA DE LÓGICA · Desarrollador/a Junior · IPSUM Technology
 ==============================================================
  Tiempo sugerido: 45 minutos
  Cómo ejecutar:   node prueba.js

  Instrucciones:
  - Implementa las 5 funciones de la sección "TU CÓDIGO".
  - No uses librerías externas. Puedes crear funciones auxiliares.
  - Al ejecutar verás qué pruebas pasan (✅) y cuáles fallan (❌).
  - Se evalúa que funcione, pero también claridad, nombres y manejo
    de casos borde. Si no terminas un ejercicio, deja comentado
    cómo lo resolverías.

  EJERCICIO 1 · esPalindromo(texto)
    Retorna true si el texto se lee igual al derecho y al revés,
    ignorando mayúsculas, espacios y signos de puntuación.
    Ej: "Anita lava la tina" -> true

  EJERCICIO 2 · segundoMayor(numeros)
    Retorna el segundo número más grande DISTINTO del arreglo.
    Si no existe, retorna null. No ordenes el arreglo (reto: una pasada).
    Ej: [3, 7, 2, 7, 5] -> 5

  EJERCICIO 3 · contarEstados(estados)
    Recibe una lista de estados de tickets de soporte y retorna un
    objeto con cuántos hay de cada uno. Normaliza: ignora mayúsculas
    y espacios al inicio/final.
    Ej: ["Abierto", "cerrado ", "abierto"] -> { abierto: 2, cerrado: 1 }

  EJERCICIO 4 · estaBalanceado(texto)
    Retorna true si los paréntesis (), corchetes [] y llaves {} están
    correctamente abiertos y cerrados. Ignora cualquier otro carácter.
    Ej: "([]{})" -> true   |   "([)]" -> false

  EJERCICIO 5 · fusionarIntervalos(intervalos)
    Recibe franjas de mantenimiento [inicio, fin] (pueden venir
    desordenadas) y retorna las franjas fusionadas cuando se solapan
    o se tocan, ordenadas por inicio.
    Ej: [[1,3],[2,6],[8,10]] -> [[1,6],[8,10]]
 ==============================================================
*/

// ===================== TU CÓDIGO =====================

function esPalindromo(texto) {
  // TODO
  const palabraInvertida = palabra.split("").reverse().join("");
  return palabra === palabraInvertida;
}


function segundoMayor(numeros) {
  // TODO
  let mayor = -Infinity;
  let segundo = -Infinity;
  for (const n of numeros) {
    if (n > mayor) {
      segundo = mayor;
      mayor = n;
    } else if (n < mayor && n > segundo) {
      segundo = n;
    }
  }
  return segundo === -Infinity ? null : segundo;
}


function contarEstados(estados) {
  // TODO
  const conteo = {};

  for (const estado of estados) {
    const clave = estado.trim().toLowerCase();
    conteo[clave] = (conteo[clave] || 0) + 1;
  }

  return conteo;
}


function estaBalanceado(texto) {
  // TODO
  const pares = { ")": "(", "]": "[", "}": "{" };
  const pila = [];

  for (const c of texto) {
    if (c === "(" || c === "[" || c === "{") {
      pila.push(c);
    } else if (c in pares) {
      if (pila.pop() !== pares[c]) return false;
    }
  }

  return pila.length === 0;
}
            

function fusionarIntervalos(intervalos) {
  // TODO
  if (intervalos.length === 0) return [];
  const ordenados = intervalos.map(([inicio, fin]) => [inicio, fin]).sort((a, b) => a[0] - b[0]);
  const resultados = [ordenados[0]];
  
  for (const [inicio, fin] of ordenados.slice(1)) {
    const ultimo = resultados[resultados.length - 1];
    if (inicio <= ultimo[1]) {
      ultimo[1] = Math.max(ultimo[1], fin);
    } else {
      resultados.push([inicio, fin]);
    }
  }
}

// ===================== NO MODIFICAR DESDE AQUÍ =====================

let ok = 0, total = 0;
const norm = (v) => JSON.stringify(v, (k, val) =>
  val && typeof val === "object" && !Array.isArray(val)
    ? Object.keys(val).sort().reduce((o, key) => ((o[key] = val[key]), o), {})
    : val);

function check(nombre, fn, esperado) {
  total++;
  let obtenido;
  try { obtenido = fn(); } catch (e) { obtenido = "Error: " + e.message; }
  const pasa = norm(obtenido) === norm(esperado);
  if (pasa) ok++;
  console.log(`${pasa ? "✅" : "❌"} ${nombre}` +
    (pasa ? "" : `\n     esperado: ${norm(esperado)}\n     obtenido: ${norm(obtenido)}`));
}

console.log("\n— Ejercicio 1 —");
check("palíndromo simple", () => esPalindromo("Anita lava la tina"), true);
check("no palíndromo", () => esPalindromo("Hola"), false);
check("con puntuación", () => esPalindromo("A man, a plan, a canal: Panama"), true);
check("cadena vacía", () => esPalindromo(""), true);

console.log("\n— Ejercicio 2 —");
check("con repetidos", () => segundoMayor([3, 7, 2, 7, 5]), 5);
check("todos iguales", () => segundoMayor([4, 4, 4]), null);
check("un solo elemento", () => segundoMayor([10]), null);
check("negativos", () => segundoMayor([-1, -5, -3]), -3);

console.log("\n— Ejercicio 3 —");
check("conteo básico", () => contarEstados(["abierto", "cerrado", "abierto", "en progreso"]),
  { abierto: 2, cerrado: 1, "en progreso": 1 });
check("normaliza", () => contarEstados(["Abierto ", "  abierto", "CERRADO"]), { abierto: 2, cerrado: 1 });
check("lista vacía", () => contarEstados([]), {});

console.log("\n— Ejercicio 4 —");
check("balanceado", () => estaBalanceado("([]{})"), true);
check("cruzado", () => estaBalanceado("([)]"), false);
check("sin cerrar", () => estaBalanceado("((("), false);
check("cierra de más", () => estaBalanceado("())"), false);
check("con texto", () => estaBalanceado("a(b)c{d}"), true);
check("vacío", () => estaBalanceado(""), true);

console.log("\n— Ejercicio 5 —");
check("solapados", () => fusionarIntervalos([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
check("se tocan", () => fusionarIntervalos([[1, 4], [4, 5]]), [[1, 5]]);
check("desordenados", () => fusionarIntervalos([[5, 7], [1, 2]]), [[1, 2], [5, 7]]);
check("contenido", () => fusionarIntervalos([[1, 10], [2, 3]]), [[1, 10]]);
check("vacío", () => fusionarIntervalos([]), []);

console.log(`\nResultado: ${ok}/${total} pruebas\n`);
