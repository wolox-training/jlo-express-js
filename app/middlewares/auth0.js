const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`
  }),
  audience: process.env.AUDIENCE,
  issuer: `${process.env.ISSUER_BASE_URL}/`,
  algorithms: ['RS256']
});
