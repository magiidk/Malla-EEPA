document.addEventListener('DOMContentLoaded', () => {
    const mallaCurricular = document.getElementById('malla-curricular');
    const resetButton = document.getElementById('reset-button');
    let materias = {};

    const planDeEstudios = [
        {
            semestre: "Primer Semestre",
            materias: [
                { codigo: "0529", nombre: "INTRODUCCIÓN A LA ECONOMIA", uc: 3, requisitos: [] },
                { codigo: "0535", nombre: "INTRODUCCIÓN AL DERECHO", uc: 4, requisitos: [] },
                { codigo: "1547", nombre: "TÉCNICAS DE ESTUDIO I", uc: 3, requisitos: [] },
                { codigo: "1548", nombre: "INTRODUCCIÓN A LAS CIENCIAS SOCIALES", uc: 3, requisitos: [] },
                { codigo: "1549", nombre: "INTRODUCCIÓN A LAS ESTRUCTURAS HISTÓRICAS I", uc:4, requisitos: [] }
            ]
        },
        {
            semestre: "Segundo Semestre",
            materias: [
                { codigo: "0528", nombre: "INTRODUCCIÓN A LA TEORIA GENERAL DE LA ORGANIZACIÓN", uc: 3, requisitos: ["1548"] },
                { codigo: "0534", nombre: "INTRODUCCIÓN A LA POLÍTICA", uc: 3, requisitos: ["1548"] },
                { codigo: "1552", nombre: "INTRODUCCIÓN AL ESTUDIO DEL ESTADO", uc: 4, requisitos: ["0535"] },
                { codigo: "1553", nombre: "TÉCNICAS DE ESTUDIO II", uc: 3, requisitos: ["1547"] },
                { codigo: "1554", nombre: "INTRODUCCIÓN A LAS ESTRUCTURAS HISTÓRICAS II", uc: 4, requisitos: ["1549"] },
                { codigo: "2647", nombre: "ECONOMÍA I", uc: 3, requisitos: ["0529"] }
            ]
        },
        {
            semestre: "Tercer Semestre",
            materias: [
                { codigo: "1546", nombre: "ESTADÍSTICA", uc: 3, requisitos: ["1553"] },
                { codigo: "1557", nombre: "HISTORIA DE LAS FORMAS POLÍTICAS MODERNAS", uc: 5, requisitos: ["1549", "1552"] },
                { codigo: "2644", nombre: "TEORÍA POLÍTICA I", uc: 6, requisitos: ["0534"] },
                { codigo: "2645", nombre: "TEORÍA GENERAL DE LA ORGANIZACIÓN I", uc: 3, requisitos: ["0528"] },
                { codigo: "2648", nombre: "SOCIOLOGÍA I", uc: 3, requisitos: ["1548"] }
            ]
        },
        {
            semestre: "Cuarto Semestre",
            materias: [
                { codigo: "0555", nombre: "METODOLOGÍA DE LA INVESTIGACIÓN EMPÍRICA", uc: 3, requisitos: ["2648", "0534", "1546"] },
                { codigo: "1558", nombre: "ECONOMÍA II", uc: 3, requisitos: ["2647"] },
                { codigo: "1563", nombre: "HISTORIA DE LAS IDEAS POLÍTICAS MODERNAS", uc: 5, requisitos: ["1557"] },
                { codigo: "2642", nombre: "TEORÍA GENERAL DE LA ORGANIZACIÓN II", uc: 3, requisitos: ["2645"] },
                { codigo: "2646", nombre: "TEORÍA POLÍTICA II", uc: 4, requisitos: ["1554", "2644"] }
            ]
        },
        {
            semestre: "Quinto Semestre",
            materias: [
                { codigo: "0551", nombre: "ESTRUCTURAS POLÍTICO-CONSTITUCIONALES COMPARADAS", uc: 3, requisitos: ["1557", "2644"] },
                { codigo: "1565", nombre: "SOCIOLOGÍA II", uc: 3, requisitos: ["2648"] },
                { codigo: "2626", nombre: "TEORÍA POLÍTICA III", uc: 4, requisitos: ["2646"] },
                { codigo: "2629", nombre: "ESTADÍSTICA SUPERIOR", uc: 3, requisitos: ["0555"] },
                { codigo: "2973", nombre: "ESTRUCTURAS INTERNACIONALES I", uc: 4, requisitos: ["0534", "1563"] },
            ]
        },
        {
            semestre: "Sexto Semestre",
            materias: [
                { codigo: "0552", nombre: "FUNDAMENTOS DE LA ADMINISTRACIÓN PÚBLICA", uc: 3, requisitos: ["1552"] },
                { codigo: "0554", nombre: "HISTORIA DE LAS IDEAS Y MOVIMIENTOS SOCIALES CONTEMPORÁNEOS", uc: 3, requisitos: ["1563", "1554"] },
                { codigo: "1568", nombre: "SISTEMA POLÍTICO VENEZOLANO", uc: 3, requisitos: ["1554", "0551", "2626"] },
                { codigo: "2581", nombre: "MATEMÁTICA APLICADA A LA CIENCIA POLÍTICA", uc: 3, requisitos: ["2629"] },
                { codigo: "2974", nombre: "ESTRUCTURAS INTERNACIONALES II", uc: 4, requisitos: ["2973"] },
            ]
        },
        {
            semestre: "Séptimo Semestre",
            materias: [
                { codigo: "2576", nombre: "ESTRUCTURAS POLÍTICAS- CONSTITUCIONALES DE AMÉRICA LATINA (POL)", uc: 6, requisitos: ["0551"] },
                { codigo: "2578", nombre: "SISTEMAS ECONÓMICOS COMPARADOS (POL)", uc: 3, requisitos: ["1558"] },
                { codigo: "2579", nombre: "FILOSOFÍA POLÍTICA (POL)", uc: 3, requisitos: ["0554"] },
                { codigo: "0573", nombre: "DERECHO ADMINISTRATIVO (APU)", uc: 6, requisitos: ["0552"] },
                { codigo: "0574", nombre: "FINANZAS PÚBLICAS I (APU)", uc: 3, requisitos: ["1558"] },
                { codigo: "0587", nombre: "DERECHO INTERNACIONAL PÚBLICO I (RRII)", uc: 4, requisitos: ["2974"] },
                { codigo: "0588", nombre: "TEORÍA DE LAS RELACIONES INTERNACIONALES (RRII)", uc: 4, requisitos: ["2974"] },
                { codigo: "2975", nombre: "HISTORIA DE LAS RELACIONES INTERNACIONALES I (RRII)", uc: 4, requisitos: ["2974"] }
            ]
        },
        {
            semestre: "Octavo Semestre",
            materias: [
                { codigo: "2627", nombre: "LECTURA DE UN CLÁSICO POLÍTICO (POL)", uc: 3, requisitos: ["2579"] },
                { codigo: "2631", nombre: "FINANZAS PÚBLICAS II (APU)", uc: 6, requisitos: ["0574"] },
                { codigo: "2976", nombre: "DERECHO INTERNACIONAL PÚBLICO II (RRII)", uc: 3, requisitos: ["2975"] },
                { codigo: "2978", nombre: "HISTORIA DE LAS RELACIONES INTERNACIONALES II (RRII)", uc: 3, requisitos: ["1568"] },
                { codigo: "2975", nombre: "HISTORIA DIPLOMÁTICA DE VENEZUELA I (RRII)", uc: 3, requisitos: ["2974"] }
            ]
        },
        {
            semestre: "Noveno Semestre",
            materias: [
                { codigo: "0579", nombre: "DERECHO CONSTITUCIONAL VENEZOLANO (RRII - APU - POL)", uc: 6, requisitos: ["1668"] },
                { codigo: "2635", nombre: "TEORÍA DEL ESTADO (POL)", uc: 3, requisitos: ["2576"] },
                { codigo: "0608", nombre: "ORGANIZACIÓN ADMINISTRATIVA VENEZOLANA (APU)", uc: 3, requisitos: ["0573"] },
                { codigo: "2634", nombre: "PROCEDIMIENTOS ADMINISTRATIVOS (APU)", uc: 4, requisitos: ["0573"] },
                { codigo: "2977", nombre: "HISTORIA DE LAS RELACIONES INTERNACIONALES III (RRII)", uc: 3, requisitos: ["2976"] },
                { codigo: "2980", nombre: "RELACIONES ECONÓMICAS INTERNACIONALES I (RRII)", uc: 5, requisitos: ["1558", "2974"] },
                { codigo: "2982", nombre: "ORGANIZACIONES INTERNACIONALES (RRII)", uc: 4, requisitos: ["0597"] }
            ]
        },
        {
            semestre: "Décimo Semestre",
            materias: [
                { codigo: "1567", nombre: "PSICOLOGÍA SOCIAL (POL - APU - RRII)", uc: 3, requisitos: ["1565"] },
                { codigo: "2583", nombre: "ECONOMÍA III (POL - APU)", uc: 3, requisitos: ["1568"] },
                { codigo: "0598", nombre: "GEOGRAFÍA POLÍTICO - ECONÓMICA (RRII)", uc: 3, requisitos: ["1558"] },
                { codigo: "2979", nombre: "HISTORIA DIPLOMÁTICA DE VENEZUELA II (RRII)", uc: 3, requisitos: ["2978"] },
                { codigo: "2981", nombre: "RELACIONES ECONÓMICAS INTERNACIONALES II (RRII)", uc: 3, requisitos: ["2980"] }
            ]
        }
    ];

    function inicializarMaterias() {
        planDeEstudios.forEach(semestre => {
            semestre.materias.forEach(materia => {
                materias[materia.codigo] = {
                    ...materia,
                    aprobada: false,
                    habilitada: false
                };
            });
        });
    }

    function guardarProgreso() {
        localStorage.setItem('materiasProgreso', JSON.stringify(materias));
    }

    function cargarProgreso() {
        const progresoGuardado = localStorage.getItem('materiasProgreso');
        if (progresoGuardado) {
            materias = JSON.parse(progresoGuardado);
        } else {
            inicializarMaterias();
        }
    }

    function actualizarEstadoMaterias() {
        for (const codigo in materias) {
            const materia = materias[codigo];
            if (!materia.aprobada) {
                const requisitosCumplidos = materia.requisitos.every(req => materias[req] && materias[req].aprobada);
                materia.habilitada = requisitosCumplidos;
            }
        }
    }

    function renderizarMalla() {
        mallaCurricular.innerHTML = '';
        planDeEstudios.forEach(semestreData => {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.innerHTML = `<h2>${semestreData.semestre}</h2>`;

            semestreData.materias.forEach(materiaData => {
                const materia = materias[materiaData.codigo];
                if (materia) {
                    const materiaDiv = document.createElement('div');
                    materiaDiv.className = 'materia';
                    materiaDiv.dataset.codigo = materia.codigo;

                    if (materia.aprobada) {
                        materiaDiv.classList.add('aprobada');
                    } else if (materia.habilitada) {
                        materiaDiv.classList.add('habilitada');
                    }

                    materiaDiv.innerHTML = `
                        <div class="materia-title">${materia.nombre} (${materia.codigo})</div>
                        <div class="materia-info">
                            <span>UC: ${materia.uc}</span>
                            ${materia.requisitos.length > 0 ? `<span>Req: ${materia.requisitos.join(', ')}</span>` : ''}
                        </div>
                    `;

                    materiaDiv.addEventListener('click', () => {
                        if (materia.habilitada && !materia.aprobada) {
                            materia.aprobada = true;
                            actualizarYRenderizar();
                        } else if (materia.aprobada) {
                            materia.aprobada = false;
                            actualizarYRenderizar();
                        }
                    });

                    semestreDiv.appendChild(materiaDiv);
                }
            });

            mallaCurricular.appendChild(semestreDiv);
        });
    }

    function actualizarYRenderizar() {
        actualizarEstadoMaterias();
        guardarProgreso();
        renderizarMalla();
    }

    resetButton.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que quieres reiniciar todo el progreso?")) {
            localStorage.removeItem('materiasProgreso');
            inicializarMaterias();
            actualizarYRenderizar();
        }
    });

    cargarProgreso();
    actualizarYRenderizar();
});
