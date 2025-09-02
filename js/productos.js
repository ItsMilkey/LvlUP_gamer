// Búsqueda de productos en tiempo real
const searchBar = document.getElementById("searchBar");
const productGrid = document.getElementById("productGrid");
const products = productGrid.getElementsByClassName("product-card");

searchBar.addEventListener("keyup", function() {
  const filter = searchBar.value.toLowerCase();
  for (let i = 0; i < products.length; i++) {
    let title = products[i].getElementsByTagName("h3")[0];
    if (title.innerText.toLowerCase().includes(filter)) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
});

// Mensaje de "agregado al carrito"
const buttons = document.querySelectorAll(".btn-add");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("✅ Producto agregado al carrito");
  });
});
