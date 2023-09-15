const {Router} = require('express')
//const Users = require('../Dao/models/users.model')
//const { getHashedPassword, comparePassword } = require('../utils/password')
const passport = require('passport')

const router = Router()

router.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}),
async (req, res) => {
    try {
        res.status(201).json({status: 'success',payload:req.user})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error', error: 'Internal server error'})
    }







    /*    try {
        const {name,lastname,email,password}=req.body
        if(!name || !lastname || !email || !password )
        return res.status(400).json({status:'error',error:'Bad Request'})

const user= await Users.findOne({email})
if(user)
return res.status(400).json ({status:'error', error:'User exists'})
        const userInfo={
    name,
    lastname,
    email,
    password: getHashedPassword(password),
}
   const newUser= await Users.create(userInfo)
   res.status(201).json({status:'success',payload:newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', error:'Internal Server Error'})

    }*/
})


router.get('/failregister',(req,res)=>{
    res.json({status:'error',error:'Fail register'})
}
)

router.get('/faillogin',(req,res)=>{
    res.json({status:'error',error:'Fail login'})
}
)


router.post('/login',passport.authenticate('login',{failureRedirect:'/faillogin'}), async (req, res) => {
   try {
    if(!req.user)
    return res.status(400).json({status:'error', error:'invalid credentials'})
req.session.user={
    email:req.user.email,
    role:'user',


}
res.json({status:'success',payload:'Nueva sesión iniciada'})
   } catch (error) {
    console.log(error)
    res.status(500).json({status:'error', error:'internal server error'})
    
   }
   
   
   
   
    /* try {
 
 
        const{email,password} = req.body
      if(!email || !password) return res.status(400).json({status:'error', error:'Bad request'})
      const user = await Users.findOne({email})
    if (!user)
    return res.status(400).json({status:'error', error: 'User and pass not matched'})
if (!comparePassword(password, user.password))
return res.status(400).json({status: 'error', error : 'User and pass not matched'})


req.session.user ={
    email :user.email,
    role:'user',
}

res.json({status:'success', payload: 'sesión iniciada'})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', error:'Internal Server Error'})
    }*/
})


module.exports=router

