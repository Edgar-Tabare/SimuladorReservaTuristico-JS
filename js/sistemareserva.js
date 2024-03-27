class SistemaReservas {
    constructor() {
        // Constructor para inicializar variables o configuraciones necesarias
    }

    fechaEstaOcupada(ubicacion, fechaEntrada, fechaSalida) {
        const reservas = this.obtenerReservas();

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

    guardarReserva(reserva) {
        let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservasGuardadas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));
        console.log('Reserva guardada correctamente:', reserva);
    }

    obtenerReservas() {
        return JSON.parse(localStorage.getItem('reservas')) || [];
    }
}
