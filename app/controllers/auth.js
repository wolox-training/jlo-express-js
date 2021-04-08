const { GENERATED } = require('../../config/constants');
const { postOAuthToken } = require('../services/auth');

const getProfile = (req, res, next) => {
  try {
    return res.send(JSON.stringify(req.oidc.user));
  } catch (err) {
    return next(err);
  }
};

const generateToken = async (req, res, next) => {
  try {
    const { data } = await postOAuthToken();
    return res.send({
      data,
      message: GENERATED
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProfile,
  generateToken
};
