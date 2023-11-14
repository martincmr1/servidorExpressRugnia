document.addEventListener("DOMContentLoaded", function () {
  const productForms = document.querySelectorAll("form");

  productForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const productId = form.getAttribute("action").split("/").pop();

      try {
        const response = await fetch(
          `/cartsMongo/1692745760670/products/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: 1 }),
          }
        );

        if (response.ok) {
          alert("Producto agregado al carrito exitosamente.");
        } else {
          alert("Hubo un problema al agregar el producto al carrito.");
        }
      } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        alert("Error en el servidor al agregar el producto al carrito.");
      }
    });
  });
});


/*

 document.getElementById('productForm').addEventListener('submit', function (event) {
      event.preventDefault();

      // Obtener los datos del formulario
      const formData = new FormData(this);

      // Enviar la solicitud POST usando Fetch API
      fetch('/ruta-donde-procesas-el-formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de la solicitud:', error);
      });
    });


    document.getElementById('productForm').addEventListener('submit', function (event) {
      event.preventDefault();

      // Obtener los datos del formulario
      const formData = new FormData(this);

      // Enviar la solicitud POST usando Fetch API
      fetch('/ruta-donde-procesas-el-formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error de la solicitud:', error);
      });
    });
*/