// Carrusel básico en index.html
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.querySelector(".carrusel");
    if (!carrusel) return; // si no hay carrusel (ej: en productos.html), no hace nada

    const tarjetas = carrusel.querySelectorAll(".tarjeta");
    let indice = 0;

    function mostrarSiguiente() {
        indice = (indice + 1) % tarjetas.length;
        carrusel.style.transform = `translateX(-${indice * 100}%)`;
    }

    setInterval(mostrarSiguiente, 3000); // cada 3s cambia
});
