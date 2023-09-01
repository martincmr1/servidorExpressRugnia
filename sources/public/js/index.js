const socket = io();
const responseProduct = document.getElementById("responseProduct");

socket.on("mensaje", (data) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  data.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `ID: ${product.id}<br>Nombre: ${product.title}<br>Descripción: ${product.description}<br>Código: ${product.code} <br>precio: ${product.price}<br>Stock: ${product.stock} <br>Categoria: ${product.category}<br>Imágenes: ${product.thumbnails}<br>Estado: ${product.status}`;
    productList.appendChild(listItem);
  });
});

const formDelete = document.getElementById("delete-form");
formDelete.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const pid = document.getElementById("id").value;
  fetch(`/realtimeproducts/${pid}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        text: data.message,
        icon: "warning",
        showCancelButton: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

const form = document.getElementById("productForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/realtimeproducts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => Swal.fire(data.message));
});
