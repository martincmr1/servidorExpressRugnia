const { PORT } = require("./sources/config/index.js");
const realtimeServer = require("./sources/servers/realTimeServer");
const app = require("./sources/servers/server.js");

require("dotenv").config();

const httpServer = app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`);
});

realtimeServer(httpServer);
