const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.json({ status: 'Logout ERROR', body: err })
      }
       return res.json({message: 'session cerrada con exito!'})
    })
})

module.exports = router;
   