const materias = [
  { nombre: "Matemática I", estado: "aprobada" },
  { nombre: "Física I", estado: "habilitada" },
  { nombre: "Química", estado: "bloqueada" },
  { nombre: "Programación", estado: "aprobada" },
  { nombre: "Estadística", estado: "habilitada" },
  { nombre: "Electrónica", estado: "bloqueada" }
];

function renderMaterias() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";
  materias.forEach(materia => {
    const div = document.createElement("div");
    div.className = `materia ${materia.estado}`;
    div.textContent = materia.nombre;
    malla.appendChild(div);
  });
}

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
renderMaterias();
