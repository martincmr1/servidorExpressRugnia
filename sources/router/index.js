const cartsController = require('../controllers/cartsController')
const productsController = require('../controllers/productsController')
const realTimeProductsController = require('../controllers/realTimeProductsController')
const mongoProductsController= require('../controllers/mongoProductsController')
const cartsControllerMongo= require('../controllers/cartsControllerMongo')
const chatControllerMongo=require('../controllers/chatControllerMongo')
//const sessionController= require('../controllers/sessionController')

/*
const usersController= require('../controllers/user/controller.users')
const homeController= require('../controllers/home/controller.home')
const contactoController= require('../controllers/contacto/controller.contacto')
const loginController= require('../controllers/login/controller.login')
const profileController= require('../controllers/profile/controller.profile')
const logoutController= require('../controllers/logout/controller.logout')
*/
const authController= require('../auth/controller.auth')
const templateController = require('../templates/controller.template')

const router = app => {
    app.use('/api/products',productsController)
    app.use('/api/carts',cartsController)
    app.use('/realtimeproducts',realTimeProductsController)
    app.use('/mongo',mongoProductsController)
    app.use('/cartsMongo',cartsControllerMongo)
    app.use('/chat',chatControllerMongo)
  //  app.use('/api/sessions',sessionController)
 /*
   app.use('/', usersController);
    app.use('/home', homeController);
    app.use('/contacto', contactoController);
    app.use('/api/sessions', contactoController);
    app.use('/login', loginController);
    app.use('/profile', profileController);
    app.use('/logout', logoutController);
/ */
 app.use('/', templateController)
app.use('/auth', authController)
app.use('*',(req,res) => {
  res.render('notFound')
})


}

module.exports =router


