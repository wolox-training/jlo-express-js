const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: process.env.API_URL || `https://localhost:${process.env.PORT}`,
  clientID: 'tj46FnmL19wYzZovONham9xtKFyZuHc0',
  issuerBaseURL: 'https://dev-fmtgdiik.us.auth0.com'
};

exports.init = app => app.use(auth(config));
