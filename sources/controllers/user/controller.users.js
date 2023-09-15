const {Router} = require('express')
const Users = require('../../Dao/models/users.model');
const passport = require('passport');

const router = Router()

router.post('/register',passport.authenticate('register',{failureRedirect:'/failregister'}),
async(req,res)=>{
    try {
        res.status(201).json({status:'success',payload:newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:'error',error:'internal server error'})
    }  
    }
)

router.get('/failregister',(req,res)=>{
    res.json({status:'error',error:'failed register'})
})




/*
router.get('/', (req, res) => {
    res.render('createUser',{ 
        style: 'createUser.css',
    })
})


router.post('/', async (req, res) => {
    try{
        const {name, lastname, email, age, password} = req.body
        const userCreated = {
            name,
            lastname,
            email,
            age,
            password
        }

        const newUserCreated = await Users.create(userCreated) 
console.log(newUserCreated)
        res.redirect('/login');

    }catch(error)
    {
        res.json({message: error})
    }
})
*/
module.exports = router;