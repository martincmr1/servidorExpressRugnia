const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }else{
      res.render('profile', { user: req.session.user, 
        style: 'createUser.css', });
    }
  
  });

  module.exports = router;