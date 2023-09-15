const form = document.getElementById('createUserForm')
const response = document.getElementById('response')

form.addEventListener('submit', event => {
    event.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value, key) => (obj [key] = value))

    fetch('/', {
        headers:{
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => response.json())
    .then(data =>   
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Felicidades ${ data.message } `,
        showConfirmButton: false,
        timer: 2000
    }))
    .catch(error => console.log(error))


    window.location.href = '/login';
})