// Obtener el cartId desde el DOM
const cartIdElement = document.getElementById('cartId');
const cartId = cartIdElement.dataset.cartId; // Obtiene el valor del atributo data-cart-id

// Obtener todos los formularios con la clase 'delete-form'
const productForms = document.querySelectorAll('.delete-form');

// Verificar si productForms tiene elementos antes de agregar el evento
if (productForms.length > 0) {
    productForms.forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            // Obtener la acción del formulario
            const action = form.getAttribute("action");
            
            // Dividir la acción en segmentos usando '/'
            const parts = action.split("/");
            
            // Obtener el productId del último segmento de la acción
            const productId = parts[parts.length - 1];
            
            // Verificar si tanto cartId como productId existen y tienen valor
            if (cartId && productId) {
                try {
                    const response = await fetch(
                        `/cartsMongo/${cartId}/products/${productId}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify()
                        }
                    );

                    if (response.ok) {
                        alert("Producto eliminado del carrito exitosamente.");
                        // Actualizar la interfaz aquí si es necesario
                    } else {
                        alert("Hubo un problema al eliminar el producto del carrito.");
                    }
                } catch (error) {
                    console.error("Error al eliminar el producto del carrito:", error);
                    alert("Error en el servidor al eliminar el producto del carrito.");
                }
            } else {
                // Si cartId o productId no tienen valor o no existen, redirigir al usuario al login
                window.location.href = '/login'; // Reemplaza '/login' con la URL de tu página de login
            }
        });
    });
} else {
    console.error('No se encontraron formularios para eliminar productos del carrito.');
}
