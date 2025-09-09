// referidos.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("referralForm");
  const pointsDisplay = document.getElementById("pointsDisplay");

  // 🔹 Cargar puntos guardados
  let puntos = parseInt(localStorage.getItem("puntosLevelUp")) || 0;
  pointsDisplay.textContent = puntos;

  // 🔹 Manejar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("referralCode").value.trim();

    if (code === "") {
      alert("⚠️ Ingresa un código de referido válido.");
      return;
    }

    // Aquí podrías validar códigos reales, por ahora todos son aceptados
    puntos += 50; // 🔥 Cada código da 50 puntos
    localStorage.setItem("puntosLevelUp", puntos);

    pointsDisplay.textContent = puntos;
    alert(`✅ Código aplicado. Has ganado 50 puntos LevelUp.\nTotal: ${puntos} puntos`);

    form.reset();
  });
});
