/*const { port } = require("./config");
const realtimeServer = require("./servers/realTimeServer");
const app = require("./servers/server.js");

const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});

realtimeServer(httpServer);
*/


const app = require('./servers/server.js');

module.exports = app; // Exporta tu aplicación Express como un servidor


