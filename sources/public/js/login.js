const loginForm= document.getElementById('loginForm')
const responseLogin = document.getElementById('responseLogin')

loginForm.addEventListener('submit', async e => {
    try {
        e.preventDefault()

    const data ={}
    const formData = new FormData(loginForm)

    formData.forEach((value,key) => (data[key] = value))



    const response = await fetch('/auth/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method:'POST',
        body:JSON.stringify(data),
    })

    const newSession = await response.json();
    
    // Verificar si el inicio de sesión fue exitoso
    if (response.ok) {
      // Redirigir al usuario a la ruta '/mongo'
      window.location.href = '/mongo';
    } else {
      responseLogin.innerText = ` ${newSession.payload}`;
    }
  } catch (error) {
    console.error(error);
  }
});