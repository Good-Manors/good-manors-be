require('dotenv').config();
const request = require('../request');
const { dropCollection } = require('../db');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
// const app = require('../../lib/app');

describe('Tests Auth routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return dropCollection('users');
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('Signs in a user', () => {
    return request
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        });
      });
    
  });
  
});
