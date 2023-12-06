document.addEventListener("DOMContentLoaded", function () {
  const productForms = document.querySelectorAll("form");

  productForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const action = form.getAttribute("action");   
      const parts = action.split("/"); // Dividir la URL en segmentos
     
      // Obteniendo cartId y productId de los segmentos de la URL
      const cartId = document.getElementById('cart').textContent;
      const productId = parts[1];

      const quantityValue = form.elements.quantity.value;
    //  console.log("Valor de quantity:", quantityValue);

      // Resto del código para procesar el valor de quantityValue
    
  









      // Verificar si tanto cartId como productId existen y tienen valor
      if (cartId && productId) {
        try {
          const response = await fetch(
            `/cartsMongo/${cartId}/products/${productId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ quantity: quantityValue }),
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
      } else {
        // Si cartId o productId no tienen valor o no existen, redirigir al usuario al login
        window.location.href = '/login'; // Reemplaza '/login' con la URL de tu página de login
      }
    });
  });
});
