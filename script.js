let materias = [];
let progreso = JSON.parse(localStorage.getItem("progreso")) || {};

async function cargarMaterias() {
  const res = await fetch("materias.json");
  materias = await res.json();
  renderMaterias();
}

function renderMaterias() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const materiasPorSemestre = {};
  materias.forEach(m => {
    if (!materiasPorSemestre[m.semestre]) materiasPorSemestre[m.semestre] = [];
    materiasPorSemestre[m.semestre].push(m);
  });

  Object.keys(materiasPorSemestre).sort((a,b) => a - b).forEach(semestre => {
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

      grid.appendChild(div);
    });
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

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar tu progreso?")) {
    progreso = {};
    guardarProgreso();
    renderMaterias();
  }
});

cargarMaterias();

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
  document.getElementById(id).addEventListener("input", e => {
    localStorage.setItem(id, e.target.value);
    aplicarColores();
    renderMaterias();
  });
});

aplicarColores();
