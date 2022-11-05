"use strict";
const nodemailer = require("nodemailer");

exports.sendMail = async (email, token, subject, message) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@180degreesacademy.net",
      pass: "Hmode1422@",
    },
  });
  await transporter.sendMail({
    from: '"180 degAcademy" <support@180degreesacademy.net>',
    to: email,
    subject: subject,
    html: `
    <h1>180 Degrees Academy</h1>
    ${message}
    <p>Greetings.</p>
    `,
  });
};
