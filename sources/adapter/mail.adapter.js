const { USER_MAIL } = require("../config");
const transport = require("../utils/nodemailer.util");

class MailAdapter {
  async sendMessage(messageInfo) {
    await transport.sendMail({
      from: USER_MAIL,
      to: messageInfo.email,
      subject: `bienvenido, ${messageInfo.name}`,
      html: `
         <div>
         <h1> hola ${messageInfo.lastname} Gracias por registrarte</h1>
         <img src
         </div> `,
      attachments: [
        {
          filename: "gato.jpg",
          path: process.cwd() + "/sources/images/gato.jpg",
          cid: "gatito",
        },
      ],
    });
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = MailAdapter;
