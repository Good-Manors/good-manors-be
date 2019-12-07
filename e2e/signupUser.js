const request = require('./request');
// const User = require('../lib/model/User');

const testUser = {
  username: 'Testy',
  password: '1234'
};

function signUpUser(user = testUser) {
  return request 
    .post('/api/v1/auth/signup')
    .send(user)
    .expect(200)
    .then(({ body }) => body);
}

module.exports = signUpUser;
