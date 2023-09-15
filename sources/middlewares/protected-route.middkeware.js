const protectedRoute = (req,res,next) => {
   // if (!req.session.user) return res.status(401).json ({status: 'error', error:'Unauthorized'})
   if (!req.session.user) return res.redirect('/login')

    next()
}

module.exports=protectedRoute

