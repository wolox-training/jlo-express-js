const { auth } = require('express-openid-connect');
const config = require('./index');

const configParams = {
  authRequired: false,
  auth0Logout: true,
  routes: {
    login: 'users/login',
    logout: 'users/logout'
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};

const port = config.common.api.port || 8080;
if (
  !configParams.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== 'production'
) {
  configParams.baseURL = `http://localhost:${port}`;
}

exports.init = app => app.use(auth(configParams));
