/*



const jwt =require('jsonwebtoken')

const secretkey='mySecret'

const generateToken = user => {
    return jwt.sign({user},secretkey,{expiresIn:'1h'})
}


const authToken=(req,res,next) =>{
    const authHeader= req.headers.authorization
   

    if(!authHeader)
    return  res.status(401).json({status:'error',error: 'Unauthorized'})

    const token=authHeader.split(' ')[1]

jwt.verify(token,secretkey,(error,credentials)=>{
    if(error) return res.status(403).json({status:'error',error:'Frobidden'})

   req.user =credentials.user 
    next()
})

   
}


module.exports={generateToken,authToken}

*/