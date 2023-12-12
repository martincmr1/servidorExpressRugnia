const cartIdElement = document.getElementById("cartId");
const cartId = cartIdElement.dataset.cartId;

const productForms = document.querySelectorAll(".delete-form");

if (productForms.length > 0) {
  productForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const action = form.getAttribute("action");

      const parts = action.split("/");

      const productId = parts[parts.length - 1];

      if (cartId && productId) {
        try {
          const response = await fetch(
            `/cartsMongo/${cartId}/products/${productId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(),
            }
          );

          if (response.ok) {
            alert("Producto eliminado del carrito exitosamente.");
          } else {
            alert("Hubo un problema al eliminar el producto del carrito.");
          }
        } catch (error) {
          console.error("Error al eliminar el producto del carrito:", error);
          alert("Error en el servidor al eliminar el producto del carrito.");
        }
      } else {
        window.location.href = "/login";
      }
    });
  });
} else {
  console.error(
    "No se encontraron formularios para eliminar productos del carrito."
  );
}
