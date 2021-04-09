const getProfile = (req, res, next) => {
  try {
    return res.send(JSON.stringify(req.oidc.user));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProfile
};
