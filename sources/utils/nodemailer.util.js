const nodemailer = require('nodemailer')
const { USER_MAIL, PASSWORD_MAIL } = require('../config')

const transport = nodemailer.createTransport({
    service:'Gmail',
    port:587,
    auth:{
        user: USER_MAIL,
        pass:PASSWORD_MAIL,}
})

module.exports=transport

