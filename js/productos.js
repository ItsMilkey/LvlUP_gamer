// ========================= 
// Datos de productos
// =========================
const productos = [
  { codigo: "JM001", categoria: "Juegos de Mesa", nombre: "Catan", precio: 29990, descripcion: "Un clásico juego de estrategia en la isla de Catan. Ideal para 3-4 jugadores.", img: "../assets/productos/catan.png", origen: "Alemania", fabricante: "Kosmos", distribuidor: "Juegos y Más Ltda." },
  { codigo: "JM002", categoria: "Juegos de Mesa", nombre: "Carcassonne", precio: 24990, descripcion: "Juego de colocación de fichas alrededor de Carcassonne. Ideal para 2-5 jugadores.", img: "../assets/productos/carcassonne.png", origen: "Francia", fabricante: "Hans im Glück", distribuidor: "BoardGames Chile" },
  { codigo: "AC001", categoria: "Accesorios", nombre: "Controlador Inalámbrico Xbox Series X", precio: 59990, descripcion: "Control inalámbrico con botones mapeables y mejor respuesta táctil.", img: "../assets/productos/xbox_Controller.png", origen: "China", fabricante: "Microsoft", distribuidor: "Xbox Chile" },
  { codigo: "AC002", categoria: "Accesorios", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, descripcion: "Sonido envolvente y micrófono desmontable para largas sesiones.", img: "../assets/productos/hyperx.png", origen: "China", fabricante: "HyperX", distribuidor: "Kingston Chile" },
  { codigo: "CO001", categoria: "Consolas", nombre: "PlayStation 5", precio: 549990, descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.", img: "../assets/productos/ps5.png", origen: "Japón", fabricante: "Sony", distribuidor: "Sony Chile" },
  { codigo: "CG001", categoria: "Computadores Gamers", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, descripcion: "PC Gamer de alto rendimiento para gamers exigentes.", img: "../assets/productos/pcgamer.png", origen: "Taiwán", fabricante: "ASUS", distribuidor: "ASUS Chile" },
  { codigo: "SG001", categoria: "Sillas Gamers", nombre: "Silla Gamer Secretlab Titan", precio: 349990, descripcion: "Soporte ergonómico y ajustes personalizados para sesiones largas.", img: "../assets/productos/sillagamer.png", origen: "Malasia", fabricante: "Secretlab", distribuidor: "Secretlab Chile" },
  { codigo: "MS001", categoria: "Mouse", nombre: "Mouse Gamer Logitech G502 HERO", precio: 49990, descripcion: "Sensor de alta precisión y botones configurables.", img: "../assets/productos/mousegamer.png", origen: "China", fabricante: "Logitech", distribuidor: "Logitech Chile" },
  { codigo: "MP001", categoria: "Mousepad", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: 29990, descripcion: "Superficie amplia con iluminación RGB.", img: "../assets/productos/mousepad.png", origen: "China", fabricante: "Razer", distribuidor: "Razer Chile" },
  { codigo: "PP001", categoria: "Poleras Personalizadas", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, descripcion: "Polera personalizable con tu gamer tag.", img: "../assets/productos/poleralvlup.png", origen: "Chile", fabricante: "Level-Up", distribuidor: "Tienda Level-Up" }
];
// =========================
// Variables DOM
// =========================
const productGrid = document.getElementById("productGrid");
const searchBar = document.getElementById("searchBar");
const categoryButtons = document.querySelectorAll(".category-btn");
const carousel = document.getElementById("carousel");

const CART_KEY = "carrito";
const cartContainer = document.querySelector(".sidebar-cart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Crear modal dinámico
const modal = document.createElement("div");
modal.id = "productModal";
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="modalImg" src="" alt="">
    <h2 id="modalName"></h2>
    <p id="modalDesc"></p>
    <p id="modalPrice"></p>
    <button id="modalAdd">Agregar al carrito</button>
  </div>
`;
document.body.appendChild(modal);

// =========================
// Funciones de Carrito
// =========================
function getCarrito() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCarrito(carrito) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

function addToCarrito(producto) {
  const carrito = getCarrito();
  carrito.push(producto);
  saveCarrito(carrito);
  renderCarrito();
}

function removeFromCarrito(index) {
  const carrito = getCarrito();
  carrito.splice(index, 1);
  saveCarrito(carrito);
  renderCarrito();
}

// Render del carrito
function renderCarrito() {
  const carrito = getCarrito();
  cartItems.innerHTML = "";

  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toLocaleString("es-CL")}
      <button class="remove-btn" data-index="${index}">❌</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Total: $${total.toLocaleString("es-CL")}`;

  // Contador en encabezado
  const header = cartContainer.querySelector("h3");
  header.textContent = `🛒 Carrito (${carrito.length})`;

  // Eventos eliminar
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      removeFromCarrito(index);
    });
  });
}

// Toggle colapsable carrito
cartContainer.querySelector("h3").addEventListener("click", () => {
  cartItems.parentElement.classList.toggle("collapsed");
});

// Inicializar carrito
renderCarrito();

// =========================
// Render productos
// =========================
function renderProductos(lista) {
  productGrid.innerHTML = "";
  lista
    .sort((a, b) => b.precio - a.precio)
    .forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.dataset.category = p.categoria;

      card.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="price" data-price="${p.precio}">$${p.precio.toLocaleString("es-CL")}</p>
        <button class="btn-view">Ver Detalles</button>
      `;
      productGrid.appendChild(card);

      // Evento abrir modal
      card.querySelector(".btn-view").addEventListener("click", () => {
        openModal(p);
      });
    });
}

// =========================
// Modal funciones
// =========================
function openModal(producto) {
  document.getElementById("modalImg").src = producto.img;
  document.getElementById("modalName").innerText = producto.nombre;
  document.getElementById("modalDesc").innerHTML = `
    ${producto.descripcion}<br><br>
    <strong>Origen de Productos:</strong> ${producto.origen}<br>
    <strong>Fabricante:</strong> ${producto.fabricante}<br>
    <strong>Distribuidor:</strong> ${producto.distribuidor}
  `;
  document.getElementById("modalPrice").innerText = `Precio: $${producto.precio.toLocaleString("es-CL")}`;

  modal.style.display = "block";

  document.getElementById("modalAdd").onclick = () => {
    addToCarrito({ name: producto.nombre, price: producto.precio });
    alert(`✅ ${producto.nombre} agregado al carrito`);
    modal.style.display = "none";
  };
}

// Cerrar modal
modal.querySelector(".close").addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// =========================
// Carrusel
// =========================
if (carousel) {
  const destacados = [...productos].sort((a, b) => b.precio - a.precio).slice(0, 3);
  carousel.innerHTML = "";

  destacados.forEach((p, i) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (i === 0) item.classList.add("active");
    item.innerHTML = `<img src="${p.img}" alt="${p.nombre}"><h2>${p.nombre}</h2>`;
    carousel.appendChild(item);
  });

  const items = carousel.querySelectorAll(".carousel-item");
  let index = 0;

  function showSlide(n) {
    items.forEach((item, i) => {
      item.style.opacity = i === n ? "1" : "0";
      item.style.transition = "opacity 0.5s ease-in-out";
    });
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    showSlide(index);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    index = (index + 1) % items.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % items.length;
    showSlide(index);
  }, 4000);

  showSlide(index);
}

// =========================
// Buscador
// =========================
searchBar.addEventListener("keyup", () => {
  const filtro = searchBar.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(filtro));
  renderProductos(filtrados);
});

// =========================
// Filtros por categoría
// =========================
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const filtrados = category === "all" ? productos : productos.filter(p => p.categoria === category);
    renderProductos(filtrados);
  });
});

// Inicializar render de productos
renderProductos(productos);
