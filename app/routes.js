const { validateRequest } = require('./middlewares/request_validator');
const weetsController = require('./controllers/weets');
const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const { createUserValidator, signIn } = require('./validators/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weet', weetsController.getWeet);
  app.post('/users', validateRequest(createUserValidator), usersController.createUser);
  app.post('/users/sessions', validateRequest(signIn), usersController.signIn);
};
