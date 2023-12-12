const realtimeServer = require("./sources/servers/realTimeServer");
const app = require("./sources/servers/server.js");

const port = process.env.PORT || 3000;

const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});

realtimeServer(httpServer);
