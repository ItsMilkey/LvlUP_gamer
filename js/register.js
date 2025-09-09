// register.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita envío inmediato

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const birthdate = document.getElementById("birthdate").value;
    const terms = document.getElementById("terms").checked;

    // 🔹 Validar usuario
    if (username.length < 3) {
      alert("El usuario debe tener al menos 3 caracteres.");
      return;
    }

    // 🔹 Validar contraseñas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // 🔹 Validar fecha de nacimiento (+18)
    if (!birthdate) {
      alert("Por favor ingresa tu fecha de nacimiento.");
      return;
    }

    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 18) {
      alert("Debes ser mayor de 18 años para registrarte.");
      return;
    }

    // 🔹 Validar términos
    if (!terms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // 🔹 Validar correo Duoc
    let descuento = false;
    if (email.endsWith("@duocuc.cl")) {
      descuento = true;
      alert("¡Felicidades! Obtienes un 20% de descuento de por vida por usar correo Duoc.");
    }

    // 🔹 Simular registro exitoso
    alert(
      `Registro exitoso 🎮\nUsuario: ${username}\nCorreo: ${email}\nEdad: ${age}\nDescuento vitalicio: ${descuento ? "Sí ✅" : "No ❌"}`
    );

    // Aquí podrías guardar datos en localStorage o enviarlos a un backend
    // localStorage.setItem("usuario", JSON.stringify({ username, email, descuento }));
    form.reset();
  });
});
