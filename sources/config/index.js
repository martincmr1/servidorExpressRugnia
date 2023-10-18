require('dotenv').config()



module.exports={
   port:process.env.PORT || 8080,
   UserMail:process.env.USER_MAIL,
   PasswordMail:process.env.PASSWORD_MAIL

 
}