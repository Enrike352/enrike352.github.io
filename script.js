let planchas = [];
let lsDocentes = [
    //{idDocente:1,docente:'Doc test 1'},
    //{idDocente:2,docente:'Doc test 2'},
    //{idDocente:3,docente:'Doc test 3'}
];
fetch('http://localhost:8080/planchas')//5s
    .then(response => response.json())
    .then(data => {
        console.log("¡Listo! Aquí están tus datos:", data);
        planchas = data;
    })
    .catch(error => console.error("Error:", error));

fetch('http://localhost:8080/docente/1')//5s
    .then(response => response.json())
    .then(data => {
        console.log("RECIBIENDO DATOS DOCENTE:", data);
        lsDocentes = data;//AQUI RECIBES LA DATA DESPUES DE 5S
        cargarDocentes2([lsDocentes]);
    })
    .catch(error => console.error("Error:", error));
// const planchas = [
//     {
//         curso: "Programacion de Computadoras 2",
//         docente: "Elias Espinoza",
//         tipo: "Parcial",
//         ciclo: "4º Ciclo",
//         periodo: "2024-1",
//         fecha: "18/04/2024",
//         archivo: "archivo"
//     },
//     {
//         curso: "Analisis de Sistemas de Informacion",
//         docente: "Soto Soto",
//         tipo: "Parcial",
//         ciclo: "5º Ciclo",
//         periodo: "2025-1",
//         fecha: "17/04/2025",
//         archivo: "archivo"
//     },
//     {
//         curso: "Estructura de Datos",
//         docente: "Luzmila Pro Concepcion",
//         tipo: "Final",
//         ciclo: "5º Ciclo",
//         periodo: "2025-1",
//         fecha: "19/04/2025",
//         archivo: "archivo"
//     },
//     {
//         curso: "Programacion de Computadoras 1",
//         docente: "Elias Espinoza",
//         tipo: "Final",
//         ciclo: "3º Ciclo",
//         periodo: "2023-2",
//         fecha: "03/12/2023",
//         archivo: "archivo"
//     }
// ];

const tabla=document.getElementById("tabla_body");
const btnBuscar=document.getElementById("btnBuscar");
const btnLimpiar=document.getElementById("btnLimpiar")
const boxDocente=document.getElementById("docente");
const boxCurso=document.getElementById("curso");
let select=document.getElementById("curso");

function lista(planchas){
    tabla.innerHTML="";
    planchas.forEach(function(plan){
    let fila = `
    <tr>
        <td>${plan.nombreCurso}</td>
        <td>${plan.nombreDocente}</td>
        <td>${plan.tipoExamen}</td>
        <td>${plan.nombreCiclo}</td>
        <td>${plan.periodoAcademico}</td>
        <td>${plan.fechaExamen}</td>
        <td>${plan.archivo}</td>
    </tr>
    `;
    tabla.innerHTML += fila;
    })
}

//http://localhost:8080/planchas
//planchas = http://localhost:8080/planchas;
//[{"idPlanchas":2,"idCurso":1,"idDocente":1,"idCiclo":2,"periodoAcademico":null,"tipoExamen":null,"fechaExamen":null,"archivo":null},{"idPlanchas":3,"idCurso":1,"idDocente":2,"idCiclo":1,"periodoAcademico":null,"tipoExamen":null,"fechaExamen":"2025-08-07","archivo":null}]

btnBuscar.addEventListener("click", () =>{
    const cursoSeleccionado=boxCurso.value;
    const docenteSeleccionado=boxDocente.value;
    const resultado=planchas.filter(plan =>{
        const coincideCurso = (cursoSeleccionado == "") || (plan.curso==cursoSeleccionado);

        const coincideDocente = (docenteSeleccionado == "") || (plan.docente==docenteSeleccionado);

        return coincideCurso && coincideDocente;
    });
    lista(resultado);
})

function cargarCursos(lista){
    const todosLosCursos = lista.map(item => item.curso);
    const cursosUnicos = [...new Set(todosLosCursos)];
    boxCurso.innerHTML = '<option value="">Seleccionar Curso</option>';

    cursosUnicos.forEach(function(curso){
        const opcionCursos = `<option value="${curso}">${curso}</option>`;
        boxCurso.innerHTML += opcionCursos;
    });
}

function cargarDocentes(lista){
    const todosLosDocentes = lista.map(item => item.docente);
    const docentesUnicos = [...new Set(todosLosDocentes)];
    boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>'

    docentesUnicos.forEach(function(docente){
        const opcionDocentes = `<option value="${docente}">${docente}</option>`;
        boxDocente.innerHTML += opcionDocentes;
    });
}

function cargarDocentes2(lsDocentes){
    console.log("LLENANDO DOCENTES CON LOS ELEMENTOS: ", lsDocentes);
    boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>'

    lsDocentes.forEach(function(docente){
        // console.log("DOCENTE",docente)
        const opcionDocentes = `<option value="${docente.idDocente}">${docente.nombreDocente}</option>`;
        boxDocente.innerHTML += opcionDocentes;
    });
}

//SE EJCUTA NI BIEN CARGA LA PANTALLA
cargarDocentes2(lsDocentes);

// cargarDocentes(planchas);
cargarCursos(planchas);

btnLimpiar.addEventListener("click", () =>{
    boxCurso.value = "";
    boxDocente.value = "";
    lista(planchas);
    tabla.innerHTML="";
})

function obtenerOpcionesUnicas(planchas, campo){
    const opciones = planchas.map(item=>item[campo]);
    const filtroDocentesCursos  = [...new Set(opciones)];
    return filtroDocentesCursos;
}

function cargarSelect(select, listaOpciones){
    select.innerHTML="";
    const OpcionDefecto = document.createElement("option");
    OpcionDefecto.text = "Seleccionar...";
    OpcionDefecto.value = "";
    select.appendChild(OpcionDefecto);
}
