const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const mailer = require('nodemailer');
const { EMAIL_SENDER, EMAIL_GENERAL_ERROR } = require('../../config/constants');
const logger = require('../logger');

const welcomeMessage = (name, lastName, email, html) => ({
  from: `Weeter API <${EMAIL_SENDER}>`,
  to: email,
  subject: 'Welcome ✔',
  text: `Welcome ${name} ${lastName}`,
  html
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
    const fileData = await fs.promises.readFile(path.join(__dirname, '../templates/welcome.html'), 'utf8');
    const template = handlebars.compile(fileData);
    const html = template({ name, lastName });
    await transporter.sendMail(welcomeMessage(name, lastName, email, html));
  } catch (err) {
    logger.info('Error sending welcome email ', err);
    throw new Error(EMAIL_GENERAL_ERROR);
  }
};

module.exports = {
  sendWelcomeEmail
};
