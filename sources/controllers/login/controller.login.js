const {Router} = require('express');
const Users = require('../../../sources/Dao/models/users.model');
const session = require('express-session');

const router = Router()

router.get('/', (req, res) => {
    res.render('login',{ 
        style: 'createUser.css',
    })


})

router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email, password });
  
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
  
      req.session.user = user;
  
    //   return res.redirect('/profile');
    return res.status(200).json({message: 'Bienvenido '+ email});
    } catch (error) {
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });

module.exports = router;