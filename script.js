document.addEventListener('DOMContentLoaded', () => {
    const semesters = [
        {
            name: "Primer Semestre",
            subjects: [
                { code: "0529", name: "INTRODUCCIÓN A LA ECONOMIA", uc: 3, requisites: [] },
                { code: "0535", name: "INTRODUCCION AL DERECHO", uc: 4, requisites: [] },
                { code: "1547", name: "TECNICAS DE ESTUDIO I", uc: 3, requisites: [] },
                { code: "1548", name: "INTRODUCCION A LAS CIENCIAS SOCIALES", uc: 3, requisites: [] },
            ]
        },
        {
            name: "Segundo Semestre",
            subjects: [
                { code: "0528", name: "INTRODUCCIÓN A LA TEORIA GENERAL DE LA ADMINISTRACIÓN", uc: 3, requisites: ["1548"] },
                { code: "0534", name: "INTRODUCCION A LA POLITICA", uc: 3, requisites: ["1548"] },
                { code: "1552", name: "INTRODUCCIÓN AL ESTUDIO DEL ESTADO", uc: 4, requisites: ["0535"] },
                { code: "1553", name: "TECNICA DE ESTUDIO II", uc: 3, requisites: ["1547"] },
                { code: "1554", name: "INTRODUCCIÓN A LAS ESTRUCTURAS HISTÓRICAS II", uc: 4, requisites: ["1549"] },
                { code: "2647", name: "ECONOMIA I", uc: 3, requisites: ["0529"] },
            ]
        },
        {
            name: "Tercer Semestre",
            subjects: [
                { code: "1546", name: "ESTADISTICA", uc: 3, requisites: ["1553"] },
                { code: "1557", name: "HISTORIA DE LAS FORMAS POLITICAS MODERNAS", uc: 5, requisites: ["1549", "1552"] },
                { code: "2644", name: "TEORIA POLITICA I", uc: 6, requisites: ["0534"] },
                { code: "2645", name: "TEORIA GENERAL DE LA ORGANIZACIÓN I", uc: 3, requisites: ["0528"] },
                { code: "2648", name: "SOCIOLOGIA", uc: 3, requisites: ["1548"] },
            ]
        },
        {
            name: "Cuarto Semestre",
            subjects: [
                { code: "0555", name: "METODOLOGIA DE LA INVESTIGACION EMPIRICA", uc: 3, requisites: ["2648", "0534", "1546"] },
                { code: "1558", name: "ECONOMIA II", uc: 3, requisites: ["2647"] },
                { code: "1563", name: "HISTORIA DE LAS IDEAS POLITICAS MODERNAS", uc: 5, requisites: ["1557"] },
                { code: "2642", name: "TEORIA GENERAL DE LA ORGANIZACIÓN II", uc: 3, requisites: ["2645"] },
                { code: "2646", name: "TEORIA POLITICA II", uc: 4, requisites: ["1554", "2644"] },
            ]
        },
        {
            name: "Quinto Semestre",
            subjects: [
                { code: "0551", name: "ESTRUCTURAS POLITICAS-CONSTITUCIONALES COMPARADAS", uc: 3, requisites: ["1557", "2644"] },
                { code: "1565", name: "SOCIOLOGIA II", uc: 3, requisites: ["2648"] },
                { code: "2626", name: "TEORIA POLITICA III", uc: 4, requisites: ["2646"] },
                { code: "2629", name: "ESTADISTICA SUPERIOR", uc: 3, requisites: ["0555"] },
                { code: "2973", name: "ESTRUCTURAS INTERNACIONALES I", uc: 4, requisites: ["0534", "1563"] },
                { code: "MONO", name: "CURSO MONOGRÀFICO", uc: 3, requisites: [] },
            ]
        },
        {
            name: "Sexto Semestre",
            subjects: [
                { code: "0552", name: "FUNDAMENTOS DE ADMINISTRACIÓN PÚBLICA", uc: 3, requisites: ["1552"] },
                { code: "0554", name: "HISTORIA DE LAS IDEAS Y MOVIMIENTOS SOCIALES CONTEMPORANEOS", uc: 3, requisites: ["1563", "1554"] },
                { code: "1568", name: "SISTEMA POLITICO VENEZOLANO", uc: 3, requisites: ["1554", "0551", "2626"] },
                { code: "2581", name: "MATEMATICA APLICADA A LA CIENCIA POLITICA", uc: 3, requisites: ["2629"] },
                { code: "2974", name: "ESTRUCTURAS INTERNACIONALES III", uc: 4, requisites: ["2973"] },
                { code: "SEMI", name: "SEMINARIOS", uc: 3, requisites: [] },
            ]
        },
        {
            name: "Séptimo Semestre",
            subjects: [
                { code: "2576", name: "ESTRUCTURAS POLITICAS- CONSTITUCIONALES DE AMERICA LATINA (POL)", uc: 6, requisites: ["0551"] },
                { code: "2578", name: "SISTEMAS ECONÒMICOS COMPARADOS (POL)", uc: 3, requisites: ["1558"] },
                { code: "2579", name: "FILOSOFIA POLITICA (POL)", uc: 3, requisites: ["0554"] },
                { code: "0573", name: "DERECHO ADMINISTRATIVO (APU)", uc: 6, requisites: ["0552"] },
                { code: "0574", name: "FINANZAS PÚBLICAS I (APU)", uc: 3, requisites: ["1558"] },
                { code: "0587", name: "DERECHO INTERNACIONAL PÚBLICO I (RIN)", uc: 4, requisites: ["2974"] },
                { code: "0588", name: "TEORIA DE LAS RELACIONES INTERNACIONALES (RIN)", uc: 4, requisites: ["2974"] },
                { code: "2975", name: "HISTORIA DE LAS RELACIONES INTERNACIONALES I (RIN)", uc: 4, requisites: ["2974"] },
            ]
        },
        {
            name: "Octavo Semestre",
            subjects: [
                { code: "2627", name: "LECTURA DE UN CLASICO POLITICO (POL)", uc: 3, requisites: ["2579"] },
                { code: "2631", name: "FINANZAS PUBLICAS II (APU)", uc: 6, requisites: ["0574"] },
                { code: "2976", name: "DERECHO INTERNACIONAL PÚBLICO II (RIN)", uc: 3, requisites: ["2975"] },
                { code: "2978", name: "TEORIA DE LAS RELACIONES INTERNACIONALES II (RIN)", uc: 3, requisites: ["1568"] },
                { code: "2975", name: "HISTORIA DIPLOMATICA DE VENEZUELA (RIN)", uc: 3, requisites: ["2974"] },
            ]
        },
        {
            name: "Noveno Semestre",
            subjects: [
                { code: "0579", name: "DERECHO CONSTITUCIONAL VENEZOLANO (POL)", uc: 6, requisites: ["1668"] },
                { code: "2635", name: "TEORIA DEL ESTADO (POL)", uc: 3, requisites: ["2576"] },
                { code: "0608", name: "ORGANIZACIÓN ADMINISTRATIVA VENEZOLANA (APU)", uc: 5, requisites: ["0573"] },
                { code: "2634", name: "PROCEDIMIENTOS ADMINISTRATIVOS (APU)", uc: 4, requisites: ["0573"] },
                { code: "2977", name: "HISTORIA DE LAS RELACIONES INTERNACIONALES III (RIN)", uc: 5, requisites: ["2976"] },
                { code: "2980", name: "RELACIONES ECONÓMICAS INTERNACIONALES I (RIN)", uc: 3, requisites: ["1558", "2974"] },
                { code: "2982", name: "ORGANIZACIONES INTERNACIONALES (RIN)", uc: 4, requisites: ["0597"] },
            ]
        },
        {
            name: "Décimo Semestre",
            subjects: [
                { code: "1567", name: "PSICOLOGIA SOCIAL (POL - APU-RIN)", uc: 3, requisites: ["1565"] },
                { code: "2583", name: "ECONOMIA III (POL - APU)", uc: 3, requisites: ["1568"] },
                { code: "0598", name: "GEOGRAFIA POLITICA ECONÒMICA (RIN)", uc: 3, requisites: ["1558"] },
                { code: "2979", name: "HISTORIA DIPLOMATICA DE VENEZUELA II (RIN)", uc: 3, requisites: ["2978"] },
                { code: "2981", name: "RELACIONES ECONÓMICAS INTERNACIONALES II (RIN)", uc: 3, requisites: ["2980"] },
            ]
        },
        // Los cursos monográficos y seminarios se pueden gestionar de manera separada o con una lógica similar.
    ];

    const meshContainer = document.getElementById('mesh-container');
    const resetButton = document.getElementById('reset-button');
    let passedSubjects = new Set();
    const storageKey = 'passedSubjects_UCV_EEYA';

    function loadProgress() {
        const storedProgress = localStorage.getItem(storageKey);
        if (storedProgress) {
            passedSubjects = new Set(JSON.parse(storedProgress));
        }
    }

    function saveProgress() {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(passedSubjects)));
    }

    function canUnlock(subject) {
        if (subject.requisites.length === 0) {
            return true;
        }
        return subject.requisites.every(reqCode => passedSubjects.has(reqCode));
    }

    function renderMesh() {
        meshContainer.innerHTML = '';
        semesters.forEach(semester => {
            const semesterDiv = document.createElement('div');
            semesterDiv.className = 'semester';
            semesterDiv.innerHTML = `<h3>${semester.name}</h3>`;
            const subjectsDiv = document.createElement('div');
            subjectsDiv.className = 'subjects';
            
            semester.subjects.forEach(subject => {
                const subjectCard = document.createElement('div');
                subjectCard.className = 'subject-card';
                subjectCard.dataset.code = subject.code;
                
                const isPassed = passedSubjects.has(subject.code);
                const isUnlocked = canUnlock(subject);

                if (isPassed) {
                    subjectCard.classList.add('passed');
                } else if (isUnlocked) {
                    subjectCard.classList.add('unlocked');
                } else {
                    subjectCard.classList.add('blocked');
                }

                subjectCard.innerHTML = `
                    <div class="subject-code">${subject.code}</div>
                    <div class="subject-name">${subject.name}</div>
                    <div class="subject-uc">U/C: ${subject.uc}</div>
                `;

                if (subject.requisites.length > 0) {
                    subjectCard.innerHTML += `<div class="subject-requisites">Req: ${subject.requisites.join(', ')}</div>`;
                }

                subjectCard.addEventListener('click', () => {
                    if (subjectCard.classList.contains('unlocked')) {
                        passedSubjects.add(subject.code);
                        saveProgress();
                        renderMesh();
                    }
                });

                subjectsDiv.appendChild(subjectCard);
            });
            
            semesterDiv.appendChild(subjectsDiv);
            meshContainer.appendChild(semesterDiv);
        });
    }

    resetButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
            passedSubjects.clear();
            saveProgress();
            renderMesh();
        }
    });

    // Cargar y renderizar al inicio
    loadProgress();
    renderMesh();
});
