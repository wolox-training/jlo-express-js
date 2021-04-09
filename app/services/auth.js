const axios = require('axios');

const postOAuthToken = () =>
  axios.post(`${process.env.ISSUER_BASE_URL}/oauth/token`, {
    audience: process.env.AUDIENCE,
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  });

module.exports = {
  postOAuthToken
};
