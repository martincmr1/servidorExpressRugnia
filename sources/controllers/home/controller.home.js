const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('homeHome',{ 
        style: 'home.css',
    })
})

module.exports = router;