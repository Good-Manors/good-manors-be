require('dotenv').config();
const request = require('supertest');
const { dropDatabase } = require('../db');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
// const User = require('../../lib/model/User');
const app = require('../../lib/app');
const agent = request.agent(app);

describe('Tests Auth routes', () => {

  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('Signs Up a user', async() => {
    await agent
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
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' });
    await agent
      .get('/api/v1/auth/signout');
    const res = await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });

    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test'
    });
  });

  it('Signs out a User', async() => {
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' });
    await agent
      .get('/api/v1/auth/signout')
      .then(res => {
        expect(res.body).toEqual({ success: true });
      });
  });

  it('Should return an error with wrong User or Password', async() => {
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '4' })
      .expect(401)
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it('Should verify a session', async() => {
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: '1234' });
    const res = await agent
      .get('/api/v1/auth/verify');
    expect(res.body).toEqual({ 
      _id: expect.any(String), 
      username: 'test' });
      
  });

  it('Should Error if no Session', async() => {
    await agent
      .get('/api/v1/auth/signout');
    await agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body.status).toBe(401);
      });
  });
});
