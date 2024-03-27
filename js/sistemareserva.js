let tarjetaSeleccionada = null; // Variable global para almacenar la tarjeta seleccionada

// Función para mostrar el formulario de reserva
function mostrarFormularioReserva(ubicacion, precio, capacidad) {
    document.getElementById("reserva").style.display = "block";

    const fechaEntradaPicker = flatpickr("#fechaEntrada", {
        dateFormat: "Y-m-d",
        minDate: "today", 
    });

    const fechaSalidaPicker = flatpickr("#fechaSalida", {
        dateFormat: "Y-m-d",
        minDate: "today", 
    });

    const reservaForm = document.getElementById("reservaForm");
    reservaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const fechaEntrada = fechaEntradaPicker.selectedDates[0];
        const fechaSalida = fechaSalidaPicker.selectedDates[0];

        if (!fechaEstaOcupada(ubicacion, fechaEntrada, fechaSalida)) {
            const diffTime = Math.abs(fechaSalida - fechaEntrada);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const precioTotal = precio * diffDays;

            const fechaReserva = `${fechaEntrada.toLocaleDateString()} - ${fechaSalida.toLocaleDateString()}`;
            const mensaje = `
                <div style="font-size: 20px; color: #3366ff;">
                    <strong>Su reserva se realizó con éxito</strong><br>
                    <div style="font-size: 18px; margin-top: 10px;">
                        <strong>Su estancia:</strong><br>
                        ${ubicacion}<br>
                        <strong>Precio total:</strong> $${precioTotal}<br> 
                        <strong>Fecha de reserva:</strong> ${fechaReserva}<br>
                    </div>
                    <div style="font-size: 24px; margin-top: 20px; color: green;">
                        <strong>Gracias por su compra<br>
                        ¡Disfrute de su descanso!</strong>
                    </div>
                </div>
            `;

            const nuevaReserva = {
                nombre: nombre,
                email: email,
                tarjeta: tarjeta,
                ubicacion: ubicacion,
                fechaEntrada: fechaEntrada,
                fechaSalida: fechaSalida,
                precioTotal: precioTotal
            };
            guardarReserva(nuevaReserva);

            reservaForm.reset();

            document.getElementById("reserva").style.display = "none";

            limpiarTarjetaSeleccionada();

            Swal.fire({
                icon: "success",
                title: "Reserva exitosa",
                html: mensaje 
            });
        } else {
            const mensajeError = "Lo sentimos, no hay disponibilidad en esa fecha o ya hay una reserva para esa ubicación en ese período. Por favor, seleccione otra fecha o ubicación.";
            console.error(mensajeError);
            Swal.fire({
                icon: "error",
                title: "Error de reserva",
                html: mensajeError
            });
        }
    });
}

// Función para verificar si la fecha seleccionada está ocupada
function fechaEstaOcupada(ubicacion, fechaEntrada, fechaSalida) {
    const reservas = obtenerReservas();

    for (const reserva of reservas) {
        const fechaEntradaReserva = new Date(reserva.fechaEntrada);
        const fechaSalidaReserva = new Date(reserva.fechaSalida);

        if (reserva.ubicacion === ubicacion) {
            if (!(fechaSalida <= fechaEntradaReserva || fechaEntrada >= fechaSalidaReserva)) {
                return true; 
            }
        }
    }

    return false; 
}

// Función para guardar una reserva en localStorage
function guardarReserva(reserva) {
    let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservasGuardadas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));
    console.log('Reserva guardada correctamente:', reserva);
}

// Función para recuperar todas las reservas almacenadas
function obtenerReservas() {
    return JSON.parse(localStorage.getItem('reservas')) || [];
}

// Función para limpiar la tarjeta seleccionada
function limpiarTarjetaSeleccionada() {
    if (tarjetaSeleccionada !== null) {
        tarjetaSeleccionada.classList.remove("custom-card");
        tarjetaSeleccionada = null; 
    }
}
