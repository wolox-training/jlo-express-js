const { CronJob } = require('cron');
const mailer = require('nodemailer');
const { EMAIL_SENDER, EMAIL_GENERAL_ERROR, TIME_ZONE } = require('../../config/constants');
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

const congratulationsEmail = () => {
  logger.info('email: ');
};

const sendWelcomeEmail = async ({ name, lastName, email }) => {
  try {
    const transporter = mailer.createTransport(transporterConfig(name, lastName));
    await transporter.sendMail(welcomeMessage(name, lastName, email));
    const job = new CronJob('*/30 * * * * *', congratulationsEmail, null, true, TIME_ZONE);
    job.start();
  } catch (err) {
    logger.info('sendWelcomeEmail: ', err);
    throw new Error(EMAIL_GENERAL_ERROR);
  }
};

module.exports = {
  sendWelcomeEmail
};
