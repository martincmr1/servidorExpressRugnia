/*const { port } = require('./sources/config');
const realtimeServer= require('./sources/servers/realTimeServer')
const app = require('./sources/servers/server.js')





const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);

  });

 realtimeServer(httpServer)


*/

const realtimeServer = require('./sources/servers/realTimeServer');
const app = require('./sources/servers/server.js');

// Utiliza process.env.PORT como el puerto de escucha para Vercel
const port = process.env.PORT || 3000; // El 3000 es un puerto de respaldo si no se proporciona PORT

const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});

realtimeServer(httpServer);



