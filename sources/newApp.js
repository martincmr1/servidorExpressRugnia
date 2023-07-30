const express = require('express')
const router = require('./router')
const morgan = require('morgan')


const app = express()

app.use(express.json())
//app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))

app.use(express.static(process.cwd() + '/public'))


router(app)


const port = 8080

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
