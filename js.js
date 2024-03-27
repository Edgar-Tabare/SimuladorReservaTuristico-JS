
// document.addEventListener('DOMContentLoaded', function () {
//     let tarjetaSeleccionada = null; // Declaración de la variable tarjetaSeleccionada dentro de la función DOMContentLoaded

//     const alojamientos = [
//         { ubicacion: "Quebrada de los Cuervos", precio: 2500, capacidad: 6, imagen: "img/quebrada.jpg" },
//         { ubicacion: "Cerro Chato", precio: 1200, capacidad: 4, imagen: "img/cerrochato.jpeg" },
//         { ubicacion: "Charqueda", precio: 1500, capacidad: 5, imagen: "img/charqueada.jpg" },
//         // Otros alojamientos...
//     ];

//     const cardsContainer = document.getElementById('cardsContainer');

//     alojamientos.forEach((alojamiento) => {
//         const card = document.createElement('div');
//         card.classList.add('col-md-4', 'mb-4', 'opcion');
//         card.innerHTML = `
//             <div class="card">
//                 <img src="${alojamiento.imagen}" class="card-img-top" alt="${alojamiento.ubicacion}">
//                 <div class="card-body">
//                     <h3 class="card-title">${alojamiento.ubicacion}</h3>
//                     <p class="card-text">Precio: $${alojamiento.precio}</p>
//                     <p class="card-text">Cabaña para ${alojamiento.capacidad} personas</p>
//                 </div>
//             </div>
//         `;
//         card.addEventListener("click", function () {
//             mostrarFormularioReserva(alojamiento.ubicacion, alojamiento.precio, alojamiento.capacidad);
//             limpiarTarjetaSeleccionada(); // Limpia la tarjeta seleccionada
//             tarjetaSeleccionada = card; // Actualiza la tarjeta seleccionada
//             tarjetaSeleccionada.classList.add("custom-card"); // Agrega estilo a la tarjeta seleccionada
//         });
//         cardsContainer.appendChild(card);
//     });

//     document.getElementById("limpiarLocalStorage").addEventListener("click", function () {
//         localStorage.removeItem("reservas");
//         console.log("LocalStorage limpiado.");
//     });

//     function mostrarFormularioReserva(ubicacion, precio, capacidad) {
//         document.getElementById("reserva").style.display = "block";

//         const fechaEntradaPicker = flatpickr("#fechaEntrada", {
//             dateFormat: "Y-m-d",
//             minDate: "today", // Fecha mínima a partir de hoy
//         });

//         const fechaSalidaPicker = flatpickr("#fechaSalida", {
//             dateFormat: "Y-m-d",
//             minDate: "today", // Fecha mínima a partir de hoy
//         });

//         const reservaForm = document.getElementById("reservaForm");
//         reservaForm.addEventListener("submit", function (event) {
//             event.preventDefault();

//             const nombre = document.getElementById("nombre").value;
//             const email = document.getElementById("email").value;
//             const tarjeta = document.getElementById("tarjeta").value;
//             const fechaEntrada = fechaEntradaPicker.selectedDates[0];
//             const fechaSalida = fechaSalidaPicker.selectedDates[0];

//             // Verificar si la fecha seleccionada está ocupada
//             if (!fechaEstaOcupada(ubicacion, fechaEntrada, fechaSalida)) {
//                 // Calculamos la diferencia de días entre la fecha de entrada y la fecha de salida
//                 const diffTime = Math.abs(fechaSalida - fechaEntrada);
//                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//                 // Calculamos el precio total multiplicando el precio por noche por la cantidad de días
//                 const precioTotal = precio * diffDays;

//                 // Crear mensaje de confirmación
//                 const fechaReserva = `${fechaEntrada.toLocaleDateString()} - ${fechaSalida.toLocaleDateString()}`;
//                 const mensaje = `
//                     <div style="font-size: 20px; color: #3366ff;">
//                         <strong>Su reserva se realizó con éxito</strong><br>
//                         <div style="font-size: 18px; margin-top: 10px;">
//                             <strong>Su estancia:</strong><br>
//                             ${ubicacion}<br>
//                             <strong>Precio total:</strong> $${precioTotal}<br> <!-- Mostramos el precio total calculado -->
//                             <strong>Fecha de reserva:</strong> ${fechaReserva}<br>
//                         </div>
//                         <div style="font-size: 24px; margin-top: 20px; color: green;">
//                             <strong>Gracias por su compra<br>
//                             ¡Disfrute de su descanso!</strong>
//                         </div>
//                     </div>
//                 `;

//                 // Guardar la reserva
//                 const nuevaReserva = {
//                     nombre: nombre,
//                     email: email,
//                     tarjeta: tarjeta,
//                     ubicacion: ubicacion,
//                     fechaEntrada: fechaEntrada,
//                     fechaSalida: fechaSalida,
//                     precioTotal: precioTotal
//                 };
//                 guardarReserva(nuevaReserva);

//                 // Limpiar el formulario
//                 reservaForm.reset();

//                 // Ocultar formulario de reserva
//                 document.getElementById("reserva").style.display = "none";

//                 // Limpiar tarjeta seleccionada
//                 limpiarTarjetaSeleccionada();

//                 // Mostrar mensaje de confirmación
//                 Swal.fire({
//                     icon: "success",
//                     title: "Reserva exitosa",
//                     html: mensaje // Pasamos el mensaje HTML formateado
//                 });
//             } else {
//                 // Mostrar mensaje de error por falta de disponibilidad
//                 const mensajeError = "Lo sentimos, no hay disponibilidad en esa fecha o ya hay una reserva para esa ubicación en ese período. Por favor, seleccione otra fecha o ubicación.";
//                 console.error(mensajeError);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error de reserva",
//                     html: mensajeError
//                 });
//             }
//         });
//     }

//     // Función para verificar si la fecha seleccionada está ocupada
//     function fechaEstaOcupada(ubicacion, fechaEntrada, fechaSalida) {
//         const reservas = obtenerReservas();

//         // Iterar sobre cada reserva
//         for (const reserva of reservas) {
//             // Convertir las fechas de reserva de cadena de texto a objetos Date
//             const fechaEntradaReserva = new Date(reserva.fechaEntrada);
//             const fechaSalidaReserva = new Date(reserva.fechaSalida);

//             // Verificar si la reserva es para la misma ubicación
//             // Aquí iría el código que proporcioné antes, continuando desde donde se dejó
//             if (reserva.ubicacion === ubicacion) {
//                 // Verificar si hay intersección de fechas con la reserva actual
//                 if (!(fechaSalida <= fechaEntradaReserva || fechaEntrada >= fechaSalidaReserva)) {
//                     return true; // Hay una intersección de fechas, por lo tanto está ocupado
//                 }
//             }
//         }

//         return false; // Ninguna reserva intersecta con el rango de fechas seleccionado
//     }

//     // Función para guardar una reserva en localStorage
//     function guardarReserva(reserva) {
//         // Obtener el array de reservas almacenadas en localStorage
//         let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];

//         // Agregar la nueva reserva al array
//         reservasGuardadas.push(reserva);

//         // Guardar el array actualizado en localStorage
//         localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));

//         console.log('Reserva guardada correctamente:', reserva);
//     }

//     // Función para recuperar todas las reservas almacenadas
//     function obtenerReservas() {
//         // Obtener el array de reservas almacenadas en localStorage
//         return JSON.parse(localStorage.getItem('reservas')) || [];
//     }

//     // Función para limpiar la tarjeta seleccionada
//     function limpiarTarjetaSeleccionada() {
//         if (tarjetaSeleccionada !== null) {
//             tarjetaSeleccionada.classList.remove("custom-card");
//             tarjetaSeleccionada = null; // Limpiar la referencia a la tarjeta seleccionada
//         }
//     }
// });
