module.exports = (req, res, next) => {
  res.status(404).json({
    error: `API path ${req.url} not found`
  });
  next();
};
