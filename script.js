let planchas = [];
let lsDocentes = [];
let lsCursos = [];
//{idDocente:3,docente:'Doc test 3'}
fetch('http://localhost:8080/planchas')//5s
    .then(response => response.json())
    .then(data => {
        planchas = data;
    })
    .catch(error => console.error("Error:", error));

fetch('http://localhost:8080/docente')//5s
    .then(response => response.json())
    .then(data => {
        lsDocentes = data;//AQUI RECIBES LA DATA DESPUES DE 5S
        cargarDocentes2(lsDocentes);
    })
    .catch(error => console.error("Error:", error));

fetch('http://localhost:8080/curso')//5s
    .then(response => response.json())
    .then(data => {
        console.log("RECIBIENDO DATOS CURSO:", data);
        lsCursos = data;//AQUI RECIBES LA DATA DESPUES DE 5S
        cargarCursos2(lsCursos);
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

btnBuscar.addEventListener("click", () =>{
    const cursoSeleccionado=boxCurso.value;
    const docenteSeleccionado=boxDocente.value;
    const resultado=planchas.filter(plan =>{
        const coincideCurso = (cursoSeleccionado == "") || (plan.idCurso==cursoSeleccionado);

        const coincideDocente = (docenteSeleccionado == "") || (plan.idDocente==docenteSeleccionado);

        return coincideCurso && coincideDocente;
    });
    lista(resultado);
})
/*
boxDocente.addEventListener("change", ()=>{
    const filtroCurso=boxCurso.value;
    const filtroDocente=boxDocente.value;
    const planchasDelProfe=planchas.filter(plan =>{
        return plan.idDocente==filtroDocente;
    });
    console.log("Planchas de este profe: ", planchasDelProfe);
})
*/
boxDocente.addEventListener("change", () => {
    const filtroDocente = boxDocente.value;
    if(filtroDocente==""){
        cargarCursos2(lsCursos);
    }else{
        // 1. Filtramos las planchas del profe seleccionado
    const planchasDelDocente = planchas.filter(plan => {
        return plan.idDocente == filtroDocente;
    });
    // 2. Limpiamos el combobox de cursos (dejamos solo la opción por defecto)
    boxCurso.innerHTML = '<option value="">Seleccionar Curso</option>';
    const cursosYaAgregados = [];
    // 3. Recorremos la lista chiquita que acabamos de filtrar
    planchasDelDocente.forEach(function(plan) {
        if(cursosYaAgregados.includes(plan.idCurso)==false){
            const opcion = `<option value="${plan.idCurso}">${plan.nombreCurso}</option>`;
            boxCurso.innerHTML += opcion;
            cursosYaAgregados.push(plan.idCurso);
        }
    });
    }
})

boxCurso.addEventListener("change", () => {
    const filtroCurso = boxCurso.value;
    if(filtroCurso == ""){
        cargarDocentes2(lsDocentes);
    }else{
     const planchasDelCurso = planchas.filter(plan => {
        return plan.idCurso == filtroCurso;
     });
    boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>';
    const docentesYaAgregados = [];
    planchasDelCurso.forEach(function(plan) {
        if(docentesYaAgregados.includes(plan.idDocente)==false){
            const opcion = `<option value="${plan.idDocente}">${plan.nombreDocente}</option>`;
            boxDocente.innerHTML += opcion;
            docentesYaAgregados.push(plan.idDocente);
        }
    });
    }
})
/*
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
*/
function cargarCursos2(lsCursos){
    console.log("LLENANDO CURSOS CON LOS ELEMENTOS CURSOS: ", lsCursos);
    boxCurso.innerHTML = '<option value="">Seleccionar Curso</option>';

    lsCursos.forEach(function(curso){
        console.log("CURSO",curso)
        const opcionCursos = `<option value="${curso.idCurso}">${curso.nombreCurso}</option>`;
        boxCurso.innerHTML += opcionCursos;
    });
}

function cargarDocentes2(lsDocentes){
    boxDocente.innerHTML = '<option value="">Seleccionar Docente</option>'

    lsDocentes.forEach(function(docente){
        const opcionDocentes = `<option value="${docente.idDocente}">${docente.nombreDocente}</option>`;
        boxDocente.innerHTML += opcionDocentes;
    });
}

//SE EJCUTA NI BIEN CARGA LA PANTALLA
cargarDocentes2(lsDocentes);

btnLimpiar.addEventListener("click", () =>{
    cargarCursos2(lsCursos);
    cargarDocentes2(lsDocentes);
    boxCurso.value = "";
    boxDocente.value = "";
    tabla.innerHTML = "";
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