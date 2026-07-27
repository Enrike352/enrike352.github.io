let planchas = [];
let lsCursos = [];

const tabla = document.getElementById("tabla_body");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar")
const boxDocente = document.getElementById("docente");
const boxCurso = document.getElementById("curso");
let select = document.getElementById("curso");

fetch('http://localhost:8080/planchas')
    .then(response => response.json())
    .then(data => {
        planchas = data;
        console.log("PLANCHAS: ", planchas);
    })
    .catch(error => console.error("Error:", error));

fetch('http://localhost:8080/curso')
    .then(response => response.json())
    .then(data => {
        lsCursos = data;
        cargarCursos(lsCursos);
    })
    .catch(error => console.error("Error:", error));

function buscarDocentesPorCurso(idCurso) {
    fetch(`http://localhost:8080/docente/curso/${idCurso}`)
        .then(response => response.json())
        .then(docentesDelCurso => {
            let opciones = '<option value="">Seleccionar Docente</option>';
            docentesDelCurso.forEach(docente => {
                opciones += `<option value="${docente.idDocente}">${docente.nombreDocente}</option>`;
            });
            boxDocente.innerHTML = opciones;
        })
        .catch(error => console.error("Error al obtener los docentes:", error));
}

function rellenarTabla(planchas) {
    tabla.innerHTML = "";
    planchas.forEach(function (plan) {
        let celdaArchivo = "";
        if (plan.archivo == null || plan.archivo === "") {
            celdaArchivo = `<span style="color: gray;">Sin archivo</span>`;
        } else {
            celdaArchivo = `<a href="data:application/pdf;base64,${plan.archivo}" download="plancha_${plan.nombreCurso}.pdf" style="text-decoration: none; color: blue; font-weight: bold;">📄 Descargar PDF</a>`;
        }

        let fila = `
    <tr>
        <td>${plan.nombreCurso}</td>
        <td>${plan.nombreDocente}</td>
        <td>${plan.tipoExamen}</td>
        <td>${plan.nombreCiclo}</td>
        <td>${plan.periodoAcademico}</td>
        <td>${plan.fechaExamen}</td>
        <td>${celdaArchivo}</td>
    </tr>
    `;
        tabla.innerHTML += fila;
    })
}

function cargarCursos(lsCursos) {
    boxCurso.innerHTML = '<option value="">Seleccionar Curso</option>';
    lsCursos.forEach(function (curso) {
        const opcionCursos = `<option value="${curso.idCurso}">${curso.nombreCurso}</option>`;
        boxCurso.innerHTML += opcionCursos;
    });
}

btnBuscar.addEventListener("click", () => {
    const cursoSeleccionado = boxCurso.value;
    const docenteSeleccionado = boxDocente.value;
    const resultados = planchas.filter(plan => {
        const coincideCurso = (cursoSeleccionado == "") || (plan.idCurso == cursoSeleccionado);
        const coincideDocente = (docenteSeleccionado == "") || (plan.idDocente == docenteSeleccionado);
        return coincideCurso && coincideDocente;
    });
    rellenarTabla(resultados);
})


boxCurso.addEventListener("change", () => {
    const filtroCurso = boxCurso.value;

    if (filtroCurso === "") {
        boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>';
    } else {
        buscarDocentesPorCurso(filtroCurso);
    }
});

btnLimpiar.addEventListener("click", () => {
    boxCurso.value = "";
    boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>';
    tabla.innerHTML = "";
})