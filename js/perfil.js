// perfil.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("perfilForm");
  const logoutBtn = document.getElementById("logout");

  // 🔹 Obtener usuario logueado desde localStorage
  let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    alert("⚠️ Debes iniciar sesión primero.");
    window.location.href = "login.html";
    return;
  }

  // 🔹 Mostrar datos en el formulario
  document.getElementById("username").value = usuarioActivo.username || "";
  document.getElementById("email").value = usuarioActivo.email || "";
  document.getElementById("birthdate").value = usuarioActivo.birthdate || "";
  document.getElementById("preferencia").value = usuarioActivo.preferencia || "";

  // 🔹 Guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    usuarioActivo.username = document.getElementById("username").value.trim();
    usuarioActivo.birthdate = document.getElementById("birthdate").value;
    usuarioActivo.preferencia = document.getElementById("preferencia").value;

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    alert("✅ Perfil actualizado correctamente.");
  });

  // 🔹 Cerrar sesión
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    alert("👋 Sesión cerrada.");
    window.location.href = "login.html";
  });
});
