document.addEventListener("DOMContentLoaded", () => {
  console.log("Index cargado correctamente 🚀");

  // Selección de elementos
  const carritoIcon = document.querySelector(".carrito-icon"); // 👈 corregido
  const carritoPopup = document.getElementById("carrito-popup");
  const carritoLista = document.getElementById("carrito-lista");
  const carritoTotal = document.getElementById("carrito-total");

  let carrito = [];

  // Abrir/cerrar carrito al hacer clic en el icono
  carritoIcon.addEventListener("click", () => {
    carritoPopup.classList.toggle("active");
  });

  // Cerrar carrito si se hace clic fuera de él
  document.addEventListener("click", (e) => {
    if (!carritoPopup.contains(e.target) && !carritoIcon.contains(e.target)) {
      carritoPopup.classList.remove("active");
    }
  });

  // Función para agregar producto
  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    renderCarrito();
    guardarCarrito();
  }

  // Función para eliminar producto
  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderCarrito();
    guardarCarrito();
  }

  // Renderizar carrito
  function renderCarrito() {
    let total = 0;
    carritoLista.innerHTML = carrito
      .map((item, index) => {
        total += item.precio;
        return `
          <li>
            ${item.nombre} - $${item.precio}
            <button data-index="${index}" class="btn-eliminar">❌</button>
          </li>
        `;
      })
      .join("");
    carritoTotal.textContent = "$" + total;

    // Event delegation para botones de eliminar
    carritoLista.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        eliminarDelCarrito(index);
      });
    });
  }

  // Guardar en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Cargar desde localStorage
  function cargarCarrito() {
    const data = localStorage.getItem("carrito");
    if (data) {
      carrito = JSON.parse(data);
      renderCarrito();
    }
  }

  // Inicializar
  cargarCarrito();

  // Exponer solo lo necesario (ej: pruebas con botones)
  window.agregarAlCarrito = agregarAlCarrito;
});
