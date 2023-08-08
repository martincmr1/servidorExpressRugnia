const express = require('express')
const handlebars = require ('express-handlebars')
const {Server}= require('socket.io')
const morgan = require('morgan')
const router = require('./router')


const app = express()

app.use(express.json())
//app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.static(process.cwd() + '/public'))
app.engine('handlebars',handlebars.engine())
app.set('views', (process.cwd() + '/views'))
app.set('view engine','handlebars')


router(app)


const port = 8080


const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket =>{
 console.log('server io running with id',socket.id) 
})





