
const Boton = document.getElementById('cerrarSesion');


Boton.addEventListener('click', () => {
    fetch('/logout', {
        method: 'GET', 
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Hubo un problema en la solicitud.');
        }
    })
    .then(data => {
        alert('Sesión cerrada con éxito.');
        window.location.href = '/login';
    })
    .catch(error => {
        console.error(error);
        // Maneja cualquier error que pueda ocurrir durante la solicitud
    });
});