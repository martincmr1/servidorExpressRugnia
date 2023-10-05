const realtimeServer= require('./realTimeServer')
const app = require('./server.js')
require('dotenv').config();
port = process.env.PORT
//port=3000


const httpServer = app.listen(port, () => {
  console.log(`Server running at port:${port}`);

  });

 realtimeServer(httpServer)
