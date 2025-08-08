const materias = [
  { codigo: "0529", nombre: "Introducción a la Economía", semestre: 1, correlativas: [] },
  { codigo: "0535", nombre: "Introducción al Derecho", semestre: 1, correlativas: [] },
  { codigo: "1547", nombre: "Técnicas de Estudio I", semestre: 1, correlativas: [] },
  { codigo: "1548", nombre: "Introducción a las Ciencias Sociales", semestre: 1, correlativas: [] },
  { codigo: "0528", nombre: "Introducción a la Teoría General de la Administración", semestre: 2, correlativas: ["1548"] },
  { codigo: "0534", nombre: "Introducción a la Política", semestre: 2, correlativas: ["1548"] },
  { codigo: "1552", nombre: "Introducción al Estudio del Estado", semestre: 2, correlativas: ["0535"] },
  { codigo: "1553", nombre: "Técnica de Estudio II", semestre: 2, correlativas: ["1547"] },
  { codigo: "1554", nombre: "Introducción a las Estructuras Históricas II", semestre: 2, correlativas: ["1549"] },
  { codigo: "2647", nombre: "Economía I", semestre: 2, correlativas: ["0529"] },
  { codigo: "1546", nombre: "Estadística", semestre: 3, correlativas: ["1553"] },
  { codigo: "1557", nombre: "Historia de las Formas Políticas Modernas", semestre: 3, correlativas: ["1549", "1552"] },
  { codigo: "2644", nombre: "Teoría Política I", semestre: 3, correlativas: ["0534"] },
  { codigo: "2645", nombre: "Teoría General de la Organización I", semestre: 3, correlativas: ["0528"] },
  { codigo: "2648", nombre: "Sociología", semestre: 3, correlativas: ["1548"] },
  { codigo: "0555", nombre: "Metodología de la Investigación Empírica", semestre: 4, correlativas: ["2648", "0534", "1546"] },
  { codigo: "1558", nombre: "Economía II", semestre: 4, correlativas: ["2647"] },
  { codigo: "1563", nombre: "Historia de las Ideas Políticas Modernas", semestre: 4, correlativas: ["1557"] },
  { codigo: "2642", nombre: "Teoría General de la Organización II", semestre: 4, correlativas: ["2645"] },
  { codigo: "2646", nombre: "Teoría Política II", semestre: 4, correlativas: ["1554", "2644"] },
  // ... continúa con el resto de las materias hasta el décimo semestre
];

let progreso = JSON.parse(localStorage.getItem("progreso")) || {};

function renderMaterias() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const materiasPorSemestre = {};
  materias.forEach(m => {
    if (!materiasPorSemestre[m.semestre]) materiasPorSemestre[m.semestre] = [];
    materiasPorSemestre[m.semestre].push(m);
  });

  Object.keys(materiasPorSemestre).sort((a, b) => a - b).forEach(semestre => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    materiasPorSemestre[semestre].forEach(materia => {
      const div = document.createElement("div");
      div.classList.add("materia");

      const estado = getEstado(materia);
      div.classList.add(estado);
      div.textContent = materia.nombre;
      div.dataset.codigo = materia.codigo;

      if (estado === "habilitada") {
        div.addEventListener("click", () => marcarAprobada(materia.codigo));
      }

      columna.appendChild(div);
    });

    malla.appendChild(columna);
  });
}

function getEstado(materia) {
  if (progreso[materia.codigo]) return "aprobada";
  if (materia.correlativas.every(c => progreso[c])) return "habilitada";
  return "bloqueada";
}

function marcarAprobada(codigo) {
  progreso[codigo] = true;
  guardarProgreso();
  renderMaterias();
}

function guardarProgreso() {
  localStorage.setItem("progreso", JSON.stringify(progreso));
}

document.getElementById("reset")?.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar tu progreso?")) {
    progreso = {};
    guardarProgreso();
    renderMaterias();
  }
});

function aplicarColores() {
  const root = document.documentElement;
  root.style.setProperty("--aprobada", localStorage.getItem("color-aprobada") || "#722F37");
  root.style.setProperty("--habilitada", localStorage.getItem("color-habilitada") || "#851c34");
  root.style.setProperty("--bloqueada", localStorage.getItem("color-bloqueada") || "#47020a");

  document.getElementById("color-aprobada").value = localStorage.getItem("color-aprobada") || "#722F37";
  document.getElementById("color-habilitada").value = localStorage.getItem("color-habilitada") || "#851c34";
  document.getElementById("color-bloqueada").value = localStorage.getItem("color-bloqueada") || "#47020a";
}

["color-aprobada", "color-habilitada", "color-bloqueada"].forEach(id => {
  document.getElementById(id)?.addEventListener("input", e => {
    localStorage.setItem(id, e.target.value);
    aplicarColores();
    renderMaterias();
  });
});

aplicarColores();
renderMaterias();
