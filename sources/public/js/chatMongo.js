const socket = io()

const chatBox = document.getElementById('chatBox')

const chat = async chatBox => {
  const swal = await Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingresa el e-mail para identificarte',
    inputValidator: value => {
      return !value && 'Necesitas ingresar tu E-mail'
    },
    allowOutsideClick: false,
  })

const user = swal.value

socket.emit('auth', user)

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
      if (chatBox.value.trim().length > 0) {
        socket.emit('message', { user, message: chatBox.value })
        chatBox.value = ''
      }
    }
})

socket.on('messageLogs', data => {
const log = document.getElementById('messagelogs')
let messagesInFrontend = ''
data.forEach(
obj => (messagesInFrontend += `${obj.user} dice: ${obj.message}</br>`)
    )
    log.innerHTML = messagesInFrontend
})

socket.on('newUser', data => {
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
})

Toast.fire({
    icon: 'success',
    title: `${data} se acaba de conectar`,
    })
  })
}

chat(chatBox)
