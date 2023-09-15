const express = require("express");
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(process.cwd(), "./productos.json");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const router = require("./router");
const connectMongo = require("./db");
const Messages = require("./Dao/models/messages.model");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const MongoStore= require('connect-mongo');
const initializePassport = require("./config/passport.config");
const passport = require("passport");

const app = express();
const httpServer = app.listen(8080, () => {
  console.log(`Server running at port 8080`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(process.cwd() + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser());
//app.use(session({
//  secret:'secretCoder',
//  resave:true,
//  saveUninitialized:true,
//}))

//app.use(session({
 // store:MongoStore.create({
  //  mongoUrl:"mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/?retryWrites=true&w=majority",
 //   ttl:15,
 // }),
 // secret:"asdr",
 // resave:false,
 // saveUninitialized:false,
//}))

app.use(session({
  store:MongoStore.create({
     mongoUrl:"mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
     ttl:3600,
   }),
  secret:'codersecret',
  resave:false,
  saveUninitialized:false,
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


connectMongo();

router(app);

const messages = [];

io.on("connection", async (socket) => {
  console.log("server io running with id", socket.id);
  try {
    const produc = await fs.promises.readFile(productsFilePath, "utf-8");
    const productsFilter = JSON.parse(produc);
    io.emit("mensaje", productsFilter);
  } catch (error) {
    console.log("Error leyendo el archivo:", error);
  }
  socket.on("message", async (data) => {
    messages.push(data);

    io.emit("messageLogs", messages);
    try {
      await Messages.create({ user: data.user, message: data.message });
    } catch (error) {
      console.log("Error almacenando el mensaje en MongoDB:", error);
    }
  });
  socket.on("auth", (data) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUser", data);
  });
});

/////////COOKIES/////////////////////////////////
/*
app.get("/set", (req, res) => {
  res
    .cookie("server", "express", {
      maxAge: 50000000,
    })
    .send("cookie set");
});

app.get("/get", (req, res) => {
  res.send(req.cookies.server);
});

app.get("/del", (req, res) => {
  res.clearCookie("server").send("cookie eliminada");
});


app.get('/',(req,res)=> {
  res.sendFile(__dirname + '/index.html')
})


app.post('/submit',(req,res) => {
  const {name,email} =req.body
  res.cookie('user',email,{maxAge:10000}).send('cookie creada')
})

app.get("/getCookie", (req, res) => {
 const userCookie = req.cookies.user
  res.send("cookie recibida" + userCookie)
  console.log(userCookie)
});

////////////////////////session//////////////////////////////////

app.get('/session',(req,res)=>{
  if(req.session.counter++){
  res.send(`se ha visitado el sitio ${req.session.counter} veces`)
}
else{
  req.session.counter = 1
  res.send('BIENVENIDO!!')
}
})

app.get('/logout', (req,res) =>{
  req.session.destroy(err =>{
    if(!err) res.send('logout ok!')
    else res.send({status:'logout ERROR', body:err})

  })
})

app.get('/login',(req,res)=> {
  const { username,password} = req.query
  if(username!== 'pepe' || password !== 'pepepass'){
    return res.send('login failed')
  }
  req.session.user = username
  req.session.admin= true
  res.send('login success!')
})

app.get('/privado', (req,res)=>{
  res.send('si estas viendo esto es porque te logueaste')
})

//////////////mongo storage////////////////////////


*/

module.exports = app;
