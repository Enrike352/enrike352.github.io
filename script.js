const planchas = [
    {
        curso: "Programacion de Computadoras 2",
        docente: "Elias Espinoza",
        tipo: "Parcial",
        ciclo: "4º Ciclo",
        periodo: "2024-1",
        fecha: "18/04/2024",
        archivo: "archivo"
    },
    {
        curso: "Analisis de Sistemas de Informacion",
        docente: "Soto Soto",
        tipo: "Parcial",
        ciclo: "5º Ciclo",
        periodo: "2025-1",
        fecha: "17/04/2025",
        archivo: "archivo"
    },
    {
        curso: "Estructura de Datos",
        docente: "Luzmila Pro Concepcion",
        tipo: "Final",
        ciclo: "5º Ciclo",
        periodo: "2025-1",
        fecha: "19/04/2025",
        archivo: "archivo"
    }
];
//console.log(planchas);
const tabla=document.getElementById("tabla_body");
tabla.innerHTML="";

planchas.forEach(function(plan){
    let fila = `
    <tr>
        <td>${plan.curso}</td>
        <td>${plan.docente}</td>
        <td>${plan.tipo}</td>
        <td>${plan.ciclo}</td>
        <td>${plan.periodo}</td>
        <td>${plan.fecha}</td>
        <td>${plan.archivo}</td>
    </tr>
    `;
    tabla.innerHTML += fila;
})




