const socket = io();

socket.on('mensaje', data => {
 const productList = document.getElementById('product-list');
 productList.innerHTML = ''; 
 data.forEach(product => {
 const listItem = document.createElement('li');
 listItem.innerHTML = `ID: ${product.id}<br>Nombre: ${product.title}<br>Descripción: ${product.description}<br>Código: ${product.code} <br>precio: ${product.price}<br>Stock: ${product.stock} <br>Categoria: ${product.category}<br>Imágenes: ${product.thumbnails}<br>Estado: ${product.status}`;
 productList.appendChild(listItem);
});
});
    
document.getElementById('delete-form').addEventListener('submit', function(event) {
 const idInput = document.getElementById('id');
 const pid = idInput.value.trim();
 const form = event.currentTarget;
 form.action = `/realtimeproducts/${pid}`;
 idInput.value = ''
});
