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
