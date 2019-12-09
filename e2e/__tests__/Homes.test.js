require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { dropDatabase } = require('../db');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/model/User');
const agent = request.agent(app);


describe('Tests the Homes route', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });


  it('Should post a new Home', async() => {
    const home = { title: 'Test House' };

    await User.create({ username: 'test', password: '1234' });
    await agent
      .post('/api/v1/auth/signin')
      .send({ username: 'test', password: '1234' });
    return agent
      .post('/api/v1/homes')
      .send(home)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          title: 'Test House',
          user: expect.any(String)
        });
      });
  });

});
