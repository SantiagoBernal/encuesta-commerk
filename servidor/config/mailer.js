const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "recepcion.cali@commerk.com.co",
      pass: "icwp bxib ugau ikiq",
    },
  });

  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

module.exports = transporter;