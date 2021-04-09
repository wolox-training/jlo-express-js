const { requiresAuth } = require('express-openid-connect');
const { validateRequest } = require('./middlewares/request_validator');
const weetsController = require('./controllers/weets');
const usersController = require('./controllers/users');
const adminController = require('./controllers/admin');
const ratingsController = require('./controllers/ratings');
const authController = require('./controllers/auth');
const { healthCheck } = require('./controllers/healthCheck');
const { createUserValidator, signIn } = require('./validators/users');
const { authenticateSession } = require('./middlewares/sessions');
const { verifyAdmin } = require('./middlewares/admin');
const { createWeetValidator } = require('./validators/weets');
const { createRatingValidator } = require('./validators/ratings');
const { parseIdParam } = require('./middlewares/ratings');
const { checkJWT } = require('./middlewares/auth0');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/', (req, res) => res.status(200).send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'));
  app.get('/auth/token', requiresAuth(), authController.generateToken);
  app.get('/auth/profile', [checkJWT], authController.getProfile);
  app.get('/weet', [authenticateSession], weetsController.getWeet);
  app.get('/weets', [authenticateSession], weetsController.getWeets);
  app.post('/weets', [validateRequest(createWeetValidator), authenticateSession], weetsController.createWeet);
  app.post(
    '/weets/:id/ratings',
    [validateRequest(createRatingValidator), authenticateSession, parseIdParam],
    ratingsController.createRating
  );
  app.get('/users', [authenticateSession], usersController.getUsers);
  app.post('/users', validateRequest(createUserValidator), usersController.createUser);
  app.post('/users/sessions', validateRequest(signIn), usersController.signIn);
  app.post(
    '/admin/users',
    [validateRequest(createUserValidator), authenticateSession, verifyAdmin],
    adminController.createOrUpdateAdminUser
  );
};
