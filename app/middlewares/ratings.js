exports.parseIdParam = (req, res, next) => {
  try {
    Object.assign(req.params, { id: parseInt(req.params.id) });
    return next();
  } catch (err) {
    return next(err);
  }
};
