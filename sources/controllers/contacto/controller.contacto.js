const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('contacto',{ 
        style: 'contacto.css',
    })
})


module.exports = router;