const mailer = require('nodemailer');
const { EMAIL_SENDER, EMAIL_GENERAL_ERROR } = require('../../config/constants');
const logger = require('../logger');

const welcomeMessage = (name, lastName, email) => ({
  from: `<${EMAIL_SENDER}>`,
  to: email,
  subject: 'Welcome ✔',
  text: `Welcome ${name} ${lastName}`,
  html: `<h1>Witter API</h1>
    <p>⁄¡Welcome <b>${name} ${lastName}!</b></p>
    `
});

const transporterConfig = () => ({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const sendWelcomeEmail = async ({ name, lastName, email }) => {
  try {
    const transporter = mailer.createTransport(transporterConfig(name, lastName));
    await transporter.sendMail(welcomeMessage(name, lastName, email));
  } catch (err) {
    logger.info('sendWelcomeEmail: ', err);
    throw new Error(EMAIL_GENERAL_ERROR);
  }
};

module.exports = {
  sendWelcomeEmail
};
