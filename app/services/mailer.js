const { CronJob } = require('cron');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const mailer = require('nodemailer');
const {
  EMAIL_GENERAL_ERROR,
  TIME_ZONE,
  EMAIL_TRANSPORTER_CONFIG,
  CRON_TIME
} = require('../../config/constants');
const logger = require('../logger');

const welcomeMessage = (name, lastName, email, html) => ({
  from: `Weeter API <${process.env.EMAIL_SENDER}>`,
  to: email,
  subject: 'Welcome ✔',
  text: `Welcome ${name} ${lastName}`,
  html
});

const congratulationMessage = (name, lastName, email, html) => ({
  from: `Weeter API <${process.env.EMAIL_SENDER}>`,
  to: email,
  subject: 'Congratulations 🎉',
  text: `Congratulations ${name} ${lastName}`,
  html
});

const sendCongratulationsEmail = async ({ name, lastName, email }, transporter, html) => {
  try {
    const messageInfo = await transporter.sendMail(congratulationMessage(name, lastName, email, html));
    logger.info('Congrats message info: ', messageInfo);
  } catch (err) {
    logger.info('Error sending congratularions email', err);
  }
};

const sendWelcomeEmail = async ({ name, lastName, email }) => {
  try {
    const transporter = mailer.createTransport(EMAIL_TRANSPORTER_CONFIG);
    const welcomeFile = await fs.promises.readFile(path.join(__dirname, '../templates/welcome.html'), 'utf8');
    const welcomeTemplate = handlebars.compile(welcomeFile);
    const welcomeHTML = welcomeTemplate({ name, lastName });
    const messageInfo = await transporter.sendMail(welcomeMessage(name, lastName, email, welcomeHTML));
    logger.info('Welcome message info: ', messageInfo);
  } catch (err) {
    logger.info('Error sending welcome email ', err);
    throw new Error(EMAIL_GENERAL_ERROR);
  }
};

const startCongratulationsMailJob = async ({ name, lastName, email }) => {
  try {
    const transporter = mailer.createTransport(EMAIL_TRANSPORTER_CONFIG);
    const congratulationsFile = await fs.promises.readFile(
      path.join(__dirname, '../templates/congratulations.html'),
      'utf8'
    );
    const congratulationsTemplate = handlebars.compile(congratulationsFile);
    const congratulationsHTML = congratulationsTemplate({ name, lastName });
    const job = new CronJob(
      CRON_TIME,
      () => sendCongratulationsEmail({ name, lastName, email }, transporter, congratulationsHTML),
      null,
      true,
      TIME_ZONE
    );
    job.start();
  } catch (err) {
    logger.info('Error starting congratulations email ', err);
    throw new Error(EMAIL_GENERAL_ERROR);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCongratulationsEmail,
  startCongratulationsMailJob
};
