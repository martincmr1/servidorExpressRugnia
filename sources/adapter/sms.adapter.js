const { TWILIO_SMS_NUMBER } = require("../config");
const client = require("../utils/twilio.util");

class SmsAdapter {
  async sendMessage(messageInfo) {
    await client.messages.create({
      body: `Hola ${messageInfo.first_name} Gracias por registrarte al @E-Commerce`,
      from: TWILIO_SMS_NUMBER,
      to: messageInfo.number,
    });
  }
}

module.exports = SmsAdapter;
