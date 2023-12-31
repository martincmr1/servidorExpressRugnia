require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  MONGO_URL: process.env.MONGO_URL,
  SECRET: process.env.SECRET,
  USER_MAIL: process.env.USER_MAIL,
  PASSWORD_MAIL: process.env.PASSWORD_MAIL,
  CONECT_TO_MONGO: process.env.CONECT_TO_MONGO,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER,
  ENVIRONMENT: process.env.NODE_ENV,
};
