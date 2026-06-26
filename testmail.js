require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,   // send to yourself
  subject: "Test from Wanderlust",
  text: "Email is working",
}, (err, info) => {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Email sent!", info.response);
  }
});