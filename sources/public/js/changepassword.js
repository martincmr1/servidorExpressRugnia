const loginForm = document.getElementById("loginForm");
const responseLogin = document.getElementById("responseLogin");

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const data = {};
    const formData = new FormData(loginForm);

    formData.forEach((value, key) => (data[key] = value));

    const response = await fetch("/auth/newpass", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.message) {
        responseLogin.innerText = responseData.message;
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      } else {
        responseLogin.innerText = responseData.error || "Error desconocido";
      }
    } else {
      responseLogin.innerText = "Error en la solicitud al servidor";
    }
  } catch (error) {
    responseLogin.innerText = "Error en la solicitud al servidor";
    console.error(error);
  }
});
