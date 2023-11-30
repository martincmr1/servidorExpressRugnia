const { port } = require('./sources/config');
const realtimeServer= require('./sources/servers/realTimeServer')
const app = require('./sources/servers/server.js')





const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);

  });

 realtimeServer(httpServer)


