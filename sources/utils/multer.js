const multer = require ('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
    cb(null,process.cwd() + '/public')
},
filename:(req,file,cb) => {
    const nameFile = Date.now() + "-clase.jpg"
//    cb(null,file.originalname)
    cb(null,nameFile)

},
})

const uploader = multer({storage})

module.exports = uploader