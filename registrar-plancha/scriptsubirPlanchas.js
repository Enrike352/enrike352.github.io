// fetch('http://localhost:8080/planchas', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         idPlanchas: 101,
//         idCurso: 25,
//         idDocente: 8,
//         idCiclo: 3,
//         periodoAcademico: "2026-I",
//         tipoExamen: "Parcial",
//         fechaExamen: "2026-04-15",
//         archivo: "U29tZSBjb250ZW5pZG8gZW4gYmFzZTY0",
//         nombreDocente: "Juan Pérez",
//         nombreCurso: "Matemática I",
//         nombreCiclo: "III Ciclo"
//     })
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error("Error en la petición");
//     }
//     return response.json();
// })
// .then(data => {
//     console.log("Respuesta:", data);
// })
// .catch(error => {
//     console.error("Error:", error);
// });