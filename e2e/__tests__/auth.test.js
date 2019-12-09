require('dotenv').config();
const request = require('supertest');
const { dropDatabase } = require('../db');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../../lib/model/User');
const app = require('../../lib/app');
const agent = request.agent(app);

describe('Tests Auth routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('Signs Up a user', () => {
    return agent
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
    const res = await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test2', password: '1234' });

    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test2'
    });
  });
});
