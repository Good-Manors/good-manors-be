const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-m4ymcquz.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: 'https://dev-m4ymcquz.auth0.com/',
  algoritms: ['RS256']
});
