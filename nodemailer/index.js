const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = {
  send: function (text, mail) {
    transporter.sendMail({
      from: process.env.EMAIL,
      to: mail,
      subject: "Message from Mall",
      text: `status changed to ${text}`,
      html: `status was changed to --- "${text}"`,
    });
  },
};

module.exports = sendEmail;
