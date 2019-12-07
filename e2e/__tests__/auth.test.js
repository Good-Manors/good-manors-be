require('dotenv').config();
const request = require('../request');
const { dropCollection } = require('../db');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../../lib/model/User');

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

  it('Signs Up a user', () => {
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

  it('Signs In an already registered User', async() => {
    await User.create({ username: 'test2', password: '1234' });
    const res = await request
      .post('/api/v1/auth/signin')
      .send({ username: 'test2', password: '1234' });

    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test2'
    });
  });
});
