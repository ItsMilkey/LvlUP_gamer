// reseñas.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");

  // 🔹 Cargar reseñas desde localStorage
  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

  function mostrarReseñas() {
    reviewsList.innerHTML = ""; // limpiar lista
    reseñas.forEach(r => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h3>${r.nombre}</h3>
        <p class="stars">${"⭐".repeat(r.estrellas)}</p>
        <p>"${r.comentario}"</p>
      `;
      reviewsList.appendChild(article);
    });
  }

  mostrarReseñas();

  // 🔹 Manejar envío de formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const estrellas = parseInt(document.getElementById("rating").value);
    const comentario = document.getElementById("comment").value.trim();

    if (!nombre || !estrellas || !comentario) {
      alert("⚠️ Completa todos los campos.");
      return;
    }

    // Crear reseña
    const nuevaReseña = {
      nombre,
      estrellas,
      comentario
    };

    // Guardar en array y localStorage
    reseñas.push(nuevaReseña);
    localStorage.setItem("reseñas", JSON.stringify(reseñas));

    // Mostrar en pantalla
    mostrarReseñas();

    // Resetear formulario
    form.reset();
    alert("✅ ¡Gracias por tu reseña!");
  });
});
