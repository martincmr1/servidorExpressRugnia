const { ENVIRONMENT } = require('../config');

console.log(ENVIRONMENT)

switch (ENVIRONMENT) {
    case 'dev':
        module.exports=require('./mail.adapter')
    
        break;

        case 'prod':
            module.exports= require('./sms.adapter')
          

   
        break;
}

