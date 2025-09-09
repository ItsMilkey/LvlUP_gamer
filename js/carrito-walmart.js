// carrito-walmart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  const clearCartBtn = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkout");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // 🔹 Renderizar productos
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (carrito.length === 0) {
      cartItemsContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalPriceEl.textContent = "$0";
      return;
    }

    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="../assets/img/product1.jpg" alt="Producto">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p class="price">$${parseInt(item.price).toLocaleString("es-CL")}</p>
          <div class="quantity">
            <label>Cantidad:</label>
            <input type="number" min="1" value="${item.quantity || 1}" data-index="${index}">
          </div>
        </div>
        <button class="btn-remove" data-index="${index}">Eliminar</button>
      `;

      cartItemsContainer.appendChild(div);
    });

    actualizarTotal();
  }

  // 🔹 Calcular total
  function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => {
      const cantidad = item.quantity || 1;
      total += parseInt(item.price) * cantidad;
    });
    totalPriceEl.textContent = `$${total.toLocaleString("es-CL")}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // 🔹 Manejo de cantidades
  cartItemsContainer.addEventListener("input", (e) => {
    if (e.target.type === "number") {
      const index = e.target.dataset.index;
      carrito[index].quantity = parseInt(e.target.value);
      actualizarTotal();
    }
  });

  // 🔹 Eliminar producto
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-remove")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      renderCart();
    }
  });

  // 🔹 Vaciar carrito
  clearCartBtn.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas vaciar el carrito?")) {
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCart();
    }
  });

  // 🔹 Finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    alert("✅ ¡Gracias por tu compra! Pronto recibirás un correo con los detalles.");
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCart();
  });

  // Inicializar
  renderCart();
});
