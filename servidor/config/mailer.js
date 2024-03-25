const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "jefedesarrollo@commerk.com.co",
      pass: "zgqq swve yzfa vmkr",
    },
  });

  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

module.exports = transporter;