const ensureAuth = () => (req, res, next) => {
  console.log('Mock EnsureAuth');
  
  return next();
};

module.exports = ensureAuth;
