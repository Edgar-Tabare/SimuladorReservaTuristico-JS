// Constructor para los objetos de alojamiento
function Alojamiento(id, nombre, ubicacion, precio) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.precio = precio;
}

// Función para generar un precio aleatorio dentro de un rango
function generarPrecio(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Datos de ejemplo para los alojamientos
const alojamientos = [
    new Alojamiento(1, "Hotel A", "Ciudad A", generarPrecio(100, 350)),
    new Alojamiento(2, "Hotel B", "Ciudad B", generarPrecio(100, 350)),
    new Alojamiento(3, "Hotel C", "Ciudad C", generarPrecio(100, 350))
    // Agrega más alojamientos aquí
];

// Almacenar los alojamientos en localStorage
localStorage.setItem('alojamientos', JSON.stringify(alojamientos));

// Función para mostrar los resultados de la búsqueda
function mostrarResultados() {
    const ubicacion = document.getElementById('ubicacion').value;
    const fecha = document.getElementById('fecha').value;

    const resultadosContainer = document.getElementById('resultadosContainer');
    resultadosContainer.innerHTML = '';

    alojamientos.forEach(alojamiento => {
        const resultadoHTML = `
            <div class="resultado" data-id="${alojamiento.id}">
                <h3>${alojamiento.nombre}</h3>
                <p>Ubicación: ${alojamiento.ubicacion}</p>
                <p>Precio: ${alojamiento.precio}</p>
            </div>
        `;
        resultadosContainer.innerHTML += resultadoHTML;
    });

    // Evento click para mostrar detalles del alojamiento seleccionado
    const resultados = document.querySelectorAll('.resultado');
    resultados.forEach(resultado => {
        resultado.addEventListener('click', mostrarDetalles);
    });
}

// Función para mostrar detalles del alojamiento seleccionado
function mostrarDetalles(event) {
    const alojamientoId = event.currentTarget.getAttribute('data-id');
    const alojamientoSeleccionado = alojamientos.find(alojamiento => alojamiento.id == alojamientoId);

    const detallesContainer = document.getElementById('detallesContainer');
    detallesContainer.innerHTML = `
        <h3>${alojamientoSeleccionado.nombre}</h3>
        <p>Ubicación: ${alojamientoSeleccionado.ubicacion}</p>
        <p>Precio: ${alojamientoSeleccionado.precio}</p>
    `;

    // Mostrar formulario de reserva
    document.getElementById('formulario').style.display = 'block';

    // Almacenar el alojamiento seleccionado en sessionStorage
    sessionStorage.setItem('alojamientoSeleccionado', JSON.stringify(alojamientoSeleccionado));
}
// Evento para enviar el formulario de reserva

document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario de reserva
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tarjeta = document.getElementById('tarjeta').value;

    // Crear objeto de reserva
    const reserva = {
        nombre: nombre,
        email: email,
        tarjeta: tarjeta,
        alojamiento: JSON.parse(sessionStorage.getItem('alojamientoSeleccionado')) // Obtener alojamiento seleccionado de sessionStorage
    };

    //  lógica para enviar la reserva
    console.log("Reserva:", reserva);
});

// Evento click para buscar alojamientos
document.getElementById('buscarBtn').addEventListener('click', mostrarResultados);
