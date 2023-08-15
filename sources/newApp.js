const express = require('express');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(process.cwd(), './productos.json');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const router = require('./router');


const app = express();
const httpServer = app.listen(8080, () => {
  console.log(`Server running at port 8080`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', process.cwd() + '/views');
app.set('view engine', 'handlebars');

router(app);

io.on('connection', async socket =>  {
  console.log('server io running with id', socket.id);
  try {
    const produc = await fs.promises.readFile(productsFilePath, 'utf-8');
    const productsFilter = JSON.parse(produc);
    io.emit('mensaje', productsFilter);
  } catch (error) {
    console.error('Error leyendo el archivo:', error);
  }
});


