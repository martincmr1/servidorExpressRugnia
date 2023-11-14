const loginForm = document.getElementById("loginForm");
const responseLogin = document.getElementById("responseLogin");

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const data = {};
    const formData = new FormData(loginForm);

    formData.forEach((value, key) => (data[key] = value));

    const response = await fetch("/auth/recoverypassword", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      responseLogin.innerText =
        "Te enviamos un correo electrónico para recuperar tu contraseña";
      setTimeout(function () {
        window.location.href = "/login";
      }, 3000);
    } else {
      responseLogin.innerText = "Usuario inexistente";
    }
  } catch (error) {
    responseLogin.innerText = "usuario y/o contraseña inválidos";
    console.error(error);
  }
});
