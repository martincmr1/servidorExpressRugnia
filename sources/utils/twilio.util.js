const twilio = require('twilio')
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("../config");




const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = client;


