const nodemailer = require('nodemailer')
const { UserMail, PasswordMail } = require('../config')

const transport = nodemailer.createTransport({
    service:'Gmail',
    port:587,
    auth:{
        user: UserMail,
        pass:PasswordMail,}
})

module.exports=transport

