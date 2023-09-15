const {Router} = require('express')
const protectedRoute = require('../middlewares/protected-route.middkeware')
//const Users = require('../Dao/models/users.model')
const router = Router()

router.get('/register', (req, res) => {
   res.render('register1')
})

router.get('/login', (req, res) => {
   res.render('login')
})

router.get('/profile',protectedRoute,(req,res)=> {

   
      const user ={
         email:req.session.user.email,
         role:req.session.user.role,
      }
    return   res.render('profile1',user)
   

  
})

module.exports=router