document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cardsContainer');

    // Carga dinámica de alojamientos
    const alojamientos = [
        { ubicacion: "Quebrada de los Cuervos", precio: 2500, capacidad: 6, imagen: "img/quebrada.jpg" },
        { ubicacion: "Cerro Chato", precio: 1200, capacidad: 4, imagen: "img/cerrochato.jpeg" },
        { ubicacion: "Charqueda", precio: 1500, capacidad: 5, imagen: "img/charqueada.jpg" },
        // Otros alojamientos...
    ];

    cargarAlojamientos(alojamientos);

    // Limpiar el almacenamiento local al hacer clic en el botón
    document.getElementById("limpiarLocalStorage").addEventListener("click", function () {
        localStorage.removeItem("reservas");
        console.log("LocalStorage limpiado.");
    });

    function cargarAlojamientos(alojamientos) {
        alojamientos.forEach((alojamiento) => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4', 'opcion');
            card.innerHTML = `
                <div class="card">
                    <img src="${alojamiento.imagen}" class="card-img-top" alt="${alojamiento.ubicacion}">
                    <div class="card-body">
                        <h3 class="card-title">${alojamiento.ubicacion}</h3>
                        <p class="card-text">Precio: $${alojamiento.precio}</p>
                        <p class="card-text">Cabaña para ${alojamiento.capacidad} personas</p>
                    </div>
                </div>
            `;
            card.addEventListener("click", function () {
                // Llamar a la función para mostrar el formulario de reserva
                mostrarFormularioReserva(alojamiento.ubicacion, alojamiento.precio, alojamiento.capacidad);
            });
            cardsContainer.appendChild(card);
        });
    }
});
